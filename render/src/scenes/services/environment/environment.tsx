import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, img_dark_add, layout } from '../../../assets'
import {
  EnvGroup,
  ListActions,
  NavBar,
  Refresher,
  SensitiveText,
  Separator,
  Spinner,
  Touchable
} from '../../../components'
import {
  ICronJob,
  IEnvGroup,
  IEnvVar,
  IMutationSaveEnvVarsArgs,
  IQueryEnvGroupsForServiceArgs,
  IQueryEnvVarsForServiceArgs,
  IServer
} from '../../../graphql/types'
import { dialog, helpers } from '../../../lib'
import { UPDATE_SERVICE_ENV_VARS } from './edit-env-var'
import { UPDATE_SERVICE_SECRET_FILES } from './edit-secret-file'

export const GET_SERVICE_ENV_VARS = gql`
  query envVarsForService($serviceId: String!, $isFile: Boolean!) {
    envVarsForService(serviceId: $serviceId, isFile: $isFile) {
      ...envVarFields
      __typename
    }
  }

  fragment envVarFields on EnvVar {
    id
    isFile
    key
    value
    __typename
  }
`

export const GET_SERVICE_ENV_GROUPS = gql`
  query envGroupsForService($serviceId: String!) {
    envGroupsForService(serviceId: $serviceId) {
      ...envGroupFields
      __typename
    }
  }

  fragment envGroupFields on EnvGroup {
    id
    name
    updatedAt
    envVars {
      __typename
    }
    __typename
  }
`

interface Props {
  service: ICronJob | IServer
}

export const ServiceEnvironment: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, navigate }
}) => {
  const { id } = getParam('service')

  const envVars = useQuery<
    {
      envVarsForService: IEnvVar[]
    },
    IQueryEnvVarsForServiceArgs
  >(GET_SERVICE_ENV_VARS, {
    variables: {
      isFile: false,
      serviceId: id
    }
  })

  const secretFiles = useQuery<
    {
      envVarsForService: IEnvVar[]
    },
    IQueryEnvVarsForServiceArgs
  >(GET_SERVICE_ENV_VARS, {
    variables: {
      isFile: true,
      serviceId: id
    }
  })

  const envGroups = useQuery<
    {
      envGroupsForService: IEnvGroup[]
    },
    IQueryEnvGroupsForServiceArgs
  >(GET_SERVICE_ENV_GROUPS, {
    variables: {
      serviceId: id
    }
  })

  const [updateEnvVars, updateEnvVarsMutation] = useMutation<
    {},
    IMutationSaveEnvVarsArgs
  >(UPDATE_SERVICE_ENV_VARS, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_SERVICE_ENV_VARS,
          variables: {
            isFile: false,
            serviceId: id
          }
        }
      ]
    }
  })

  const [updateSecretFiles, updateSecretFilesMutation] = useMutation<
    {},
    IMutationSaveEnvVarsArgs
  >(UPDATE_SERVICE_SECRET_FILES, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_SERVICE_ENV_VARS,
          variables: {
            isFile: true,
            serviceId: id
          }
        }
      ]
    }
  })

  const loading =
    updateEnvVarsMutation.loading || updateSecretFilesMutation.loading

  return (
    <ScrollView
      style={styles.main}
      refreshControl={
        <Refresher
          refreshing={
            envVars.loading || secretFiles.loading || envGroups.loading
          }
          onRefresh={() => {
            envVars.refetch()
            secretFiles.refetch()
            envGroups.refetch()
          }}
        />
      }>
      <View style={styles.header}>
        <Text style={styles.title}>Environment variables</Text>
        <Touchable
          onPress={() =>
            navigate('AddServiceEnvVar', {
              envVars: envVars.data?.envVarsForService,
              serviceId: id
            })
          }>
          <Image style={styles.add} source={img_dark_add} />
        </Touchable>
      </View>
      {envVars.loading && <Spinner size="small" type="bare" />}
      {!envVars.loading &&
        envVars.data?.envVarsForService.filter(({ isFile }) => !isFile)
          .length === 0 && (
          <Text style={styles.empty}>
            You haven't added any environment variables yet.
          </Text>
        )}
      <SwipeListView
        data={envVars.data?.envVarsForService.filter(({ isFile }) => !isFile)}
        disableRightSwipe
        disableVirtualization
        ItemSeparatorComponent={Separator}
        keyExtractor={({ id }) => id}
        renderHiddenItem={({ item }) => (
          <ListActions
            loading={loading}
            onEdit={() =>
              navigate('EditServiceEnvVar', {
                envVar: item,
                envVars: envVars.data?.envVarsForService,
                serviceId: id
              })
            }
            onDelete={async () => {
              if (!envVars.data) {
                return
              }

              const yes = await dialog.confirm(
                'Delete env var',
                'Are you sure you want to delete this env var?'
              )

              if (yes) {
                updateEnvVars({
                  variables: {
                    envVarInputs: helpers.removeAllTypeName(
                      envVars.data.envVarsForService.filter(
                        envVar => envVar.id !== item.id
                      )
                    ),
                    serviceId: id
                  }
                })
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
      <View style={styles.header}>
        <Text style={styles.title}>Secret files</Text>
        <Touchable
          onPress={() =>
            navigate('AddServiceSecretFile', {
              secretFiles: secretFiles.data?.envVarsForService,
              serviceId: id
            })
          }>
          <Image style={styles.add} source={img_dark_add} />
        </Touchable>
      </View>
      {secretFiles.loading && <Spinner size="small" type="bare" />}
      {!secretFiles.loading &&
        secretFiles.data?.envVarsForService.filter(({ isFile }) => isFile)
          .length === 0 && (
          <Text style={styles.empty}>
            You haven't added any secret files yet.
          </Text>
        )}
      <SwipeListView
        data={secretFiles.data?.envVarsForService.filter(
          ({ isFile }) => isFile
        )}
        disableRightSwipe
        disableVirtualization
        ItemSeparatorComponent={Separator}
        keyExtractor={({ id }) => id}
        renderHiddenItem={({ item }) => (
          <ListActions
            loading={loading}
            onEdit={() =>
              navigate('EditServiceSecretFile', {
                secretFile: item,
                secretFiles: secretFiles.data?.envVarsForService,
                serviceId: id
              })
            }
            onDelete={async () => {
              if (!secretFiles.data) {
                return
              }

              const yes = await dialog.confirm(
                'Delete secret file',
                'Are you sure you want to delete this secret file?'
              )

              if (yes) {
                updateSecretFiles({
                  variables: {
                    envVarInputs: helpers.removeAllTypeName(
                      secretFiles.data.envVarsForService.filter(
                        secretFile => secretFile.id !== item.id
                      )
                    ),
                    serviceId: id
                  }
                })
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
      <View style={styles.header}>
        <Text style={styles.title}>Linked env groups</Text>
      </View>
      {envGroups.loading && <Spinner size="small" type="bare" />}
      {!envGroups.loading &&
        envGroups.data?.envGroupsForService.length === 0 && (
          <Text style={styles.empty}>
            You haven't linked this service to any env groups.
          </Text>
        )}
      <FlatList
        data={envGroups.data?.envGroupsForService}
        disableVirtualization
        ItemSeparatorComponent={Separator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <EnvGroup
            envGroup={item}
            onPress={() =>
              navigate('EnvGroup', {
                envGroup: item
              })
            }
          />
        )}
      />
    </ScrollView>
  )
}

ServiceEnvironment.navigationOptions = {
  header: () => <NavBar back title="Environment" />
}

const styles = StyleSheet.create({
  add: {
    ...layout.icon,
    margin: layout.margin
  },
  empty: {
    ...fonts.regular,
    margin: layout.margin
  },
  header: {
    backgroundColor: colors.backgroundDark,
    flexDirection: 'row'
  },
  main: {
    flex: 1
  },
  title: {
    ...fonts.subtitle,
    flex: 1,
    padding: layout.margin
  }
})
