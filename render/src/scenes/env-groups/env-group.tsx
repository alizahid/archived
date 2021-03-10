import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, img_dark_add, layout } from '../../assets'
import {
  ListActions,
  NavBar,
  Refresher,
  SensitiveText,
  Separator,
  Service,
  Spinner
} from '../../components'
import {
  IEnvGroup,
  IMutationUpdateEnvGroupEnvVarsArgs,
  IQueryEnvGroupArgs,
  IQueryServicesForEnvGroupArgs,
  IService
} from '../../graphql/types'
import { dialog, helpers } from '../../lib'
import { UPDATE_ENV_VARS, UPDATE_SECRET_FILES } from './edit-env-var'

export const GET_ENV_GROUP = gql`
  query envGroup($id: String!) {
    envGroup(id: $id) {
      ...envGroupFields
      __typename
    }
  }

  fragment envGroupFields on EnvGroup {
    id
    name
    updatedAt
    envVars {
      ...envVarFields
      __typename
    }
    __typename
  }

  fragment envVarFields on EnvVar {
    id
    isFile
    key
    value
    __typename
  }
`

export const GET_SERVICES_FOR_ENV_GROUP = gql`
  query servicesForEnvGroup($envGroupId: String!) {
    servicesForEnvGroup(envGroupId: $envGroupId) {
      id
      type
      userFacingType
      userFacingTypeSlug
      name
      env {
        ...envFields
        __typename
      }
      repo {
        ...repoFields
        __typename
      }
      updatedAt
      state
      user {
        id
        __typename
      }
      __typename
    }
  }

  fragment envFields on Env {
    id
    name
    isStatic
    __typename
  }

  fragment repoFields on Repo {
    id
    provider
    name
    ownerName
    __typename
  }
`

interface Props {
  envGroup: IEnvGroup
}

export const EnvGroup: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, navigate }
}) => {
  const { id } = getParam('envGroup')

  const envGroup = useQuery<
    {
      envGroup: IEnvGroup
    },
    IQueryEnvGroupArgs
  >(GET_ENV_GROUP, {
    variables: {
      id
    }
  })

  const services = useQuery<
    {
      servicesForEnvGroup: IService[]
    },
    IQueryServicesForEnvGroupArgs
  >(GET_SERVICES_FOR_ENV_GROUP, {
    variables: {
      envGroupId: id
    }
  })

  const [updateEnvVars, updateEnvVarsMutation] = useMutation<
    {},
    IMutationUpdateEnvGroupEnvVarsArgs
  >(UPDATE_ENV_VARS, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_ENV_GROUP,
          variables: {
            id
          }
        }
      ]
    }
  })

  const [updateSecretsFiles, updateSecretsFilesMutation] = useMutation<
    {},
    IMutationUpdateEnvGroupEnvVarsArgs
  >(UPDATE_SECRET_FILES, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_ENV_GROUP,
          variables: {
            id
          }
        }
      ]
    }
  })

  const removeEnvVar = (id: string, isFile: boolean) => {
    if (!envGroup.data?.envGroup) {
      return
    }

    !(isFile ? updateSecretsFiles : updateEnvVars)({
      variables: {
        envVarInputs: helpers.removeAllTypeName(
          envGroup.data.envGroup.envVars.filter(envVar => envVar.id !== id)
        ),
        id: envGroup.data.envGroup.id
      }
    })
  }

  const loading =
    updateEnvVarsMutation.loading || updateSecretsFilesMutation.loading

  return (
    <ScrollView
      style={styles.main}
      refreshControl={
        <Refresher
          refreshing={envGroup.loading || services.loading}
          onRefresh={() => {
            envGroup.refetch()
            services.refetch()
          }}
        />
      }>
      <Text style={styles.title}>Environment variables</Text>
      {envGroup.loading && <Spinner size="small" type="bare" />}
      {!envGroup.loading &&
        envGroup.data?.envGroup.envVars.filter(({ isFile }) => !isFile)
          .length === 0 && (
          <Text style={styles.empty}>
            You haven't added any environment variables yet.
          </Text>
        )}
      <SwipeListView
        data={envGroup.data?.envGroup.envVars.filter(({ isFile }) => !isFile)}
        disableRightSwipe
        disableVirtualization
        ItemSeparatorComponent={Separator}
        keyExtractor={({ id }) => id}
        renderHiddenItem={({ item }) => (
          <ListActions
            loading={loading}
            onEdit={() =>
              navigate('EditEnvVar', {
                envGroup: envGroup.data?.envGroup,
                envVar: item
              })
            }
            onDelete={async () => {
              const yes = await dialog.confirm(
                'Delete env var',
                'Are you sure you want to delete this env var?'
              )

              if (yes) {
                removeEnvVar(item.id, item.isFile)
              }
            }}
          />
        )}
        renderItem={({ item }) => (
          <SensitiveText
            isLabelCode
            isValueCode
            label={item.key}
            value={item.value}
          />
        )}
        rightOpenValue={-120}
      />
      <Text style={styles.title}>Secret files</Text>
      {envGroup.loading && <Spinner size="small" type="bare" />}
      {!envGroup.loading &&
        envGroup.data?.envGroup.envVars.filter(({ isFile }) => isFile)
          .length === 0 && (
          <Text style={styles.empty}>
            You haven't added any secret files yet.
          </Text>
        )}
      <SwipeListView
        data={envGroup.data?.envGroup.envVars.filter(({ isFile }) => isFile)}
        disableRightSwipe
        disableVirtualization
        ItemSeparatorComponent={Separator}
        keyExtractor={({ id }) => id}
        renderHiddenItem={({ item }) => (
          <ListActions
            loading={loading}
            onEdit={() =>
              navigate('EditEnvVar', {
                envGroup: envGroup.data?.envGroup,
                envVar: item
              })
            }
            onDelete={async () => {
              const yes = await dialog.confirm(
                'Delete secret file',
                'Are you sure you want to delete this secret file?'
              )

              if (yes) {
                removeEnvVar(item.id, item.isFile)
              }
            }}
          />
        )}
        renderItem={({ item }) => (
          <SensitiveText
            isLabelCode
            isValueCode
            label={item.key}
            value={item.value}
          />
        )}
        rightOpenValue={-120}
      />
      <Text style={styles.title}>Linked services</Text>
      {services.loading && <Spinner size="small" type="bare" />}
      {!services.loading && services.data?.servicesForEnvGroup.length === 0 && (
        <Text style={styles.empty}>
          You haven't linked this environment group to any services.
        </Text>
      )}
      <FlatList
        data={services.data?.servicesForEnvGroup}
        disableVirtualization
        ItemSeparatorComponent={Separator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Service
            service={item}
            onPress={() => {
              if (item.type === 'cron') {
                navigate('CronJob', {
                  cronJob: item
                })
              } else if (item.type === 'server') {
                navigate('Server', {
                  server: item
                })
              }
            }}
          />
        )}
      />
    </ScrollView>
  )
}

EnvGroup.navigationOptions = ({ navigation: { getParam, navigate } }) => {
  const envGroup = getParam('envGroup')

  return {
    header: () => (
      <NavBar
        action={{
          icon: img_dark_add,
          onPress: () =>
            navigate('AddEnvVar', {
              envGroup: envGroup
            })
        }}
        back
        title={envGroup.name}
      />
    )
  }
}

const styles = StyleSheet.create({
  empty: {
    ...fonts.regular,
    margin: layout.margin
  },
  main: {
    flex: 1
  },
  title: {
    ...fonts.subtitle,
    backgroundColor: colors.backgroundDark,
    padding: layout.margin
  }
})
