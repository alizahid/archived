import { ApolloProvider } from '@apollo/react-hooks'
import * as Sentry from '@sentry/react-native'
import React, { FunctionComponent, useEffect } from 'react'
import codePush from 'react-native-code-push'
import { CODE_PUSH_KEY } from 'react-native-dotenv'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { colors, layout } from './assets'
import { KeyboardView, Spinner, TabBar } from './components'
import { client } from './graphql'
import {
  AddEnvVar,
  AddServiceEnvVar,
  AddServiceHeader,
  AddServiceRedirect,
  AddServiceSecretFile,
  CreateDatabase,
  CreateEnvGroup,
  CronJob,
  Database,
  Databases,
  EditEnvVar,
  EditServiceEnvVar,
  EditServiceHeader,
  EditServiceRedirect,
  EditServiceSecretFile,
  EnvGroup,
  EnvGroups,
  Help,
  Landing,
  Server,
  ServiceDisks,
  ServiceEnvironment,
  ServiceEvents,
  ServiceHeaders,
  ServiceLogs,
  ServiceRedirects,
  Services,
  ServiceSettings,
  ServiceSharing,
  Settings,
  SignIn
} from './scenes'
import { useAuth } from './store'

const defaultNavigationOptions = {
  cardStyle: {
    backgroundColor: colors.background,
    headerStyle: {
      height: layout.navBar.height + layout.border.width * 2
    }
  }
}

const RootNavigator = createStackNavigator(
  {
    Landing,
    SignIn
  },
  {
    defaultNavigationOptions,
    initialRouteName: 'Landing'
  }
)

const AppNavigator = createBottomTabNavigator(
  {
    Services: createStackNavigator(
      {
        AddServiceEnvVar,
        AddServiceHeader,
        AddServiceRedirect,
        AddServiceSecretFile,
        CronJob,
        EditServiceEnvVar,
        EditServiceHeader,
        EditServiceRedirect,
        EditServiceSecretFile,
        Server,
        ServiceDisks,
        ServiceEnvironment,
        ServiceEvents,
        ServiceHeaders,
        ServiceLogs,
        ServiceRedirects,
        ServiceSettings,
        ServiceSharing,
        Services
      },
      {
        defaultNavigationOptions,
        initialRouteName: 'Services'
      }
    ),
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    Databases: createStackNavigator(
      {
        CreateDatabase,
        Database,
        Databases
      },
      {
        defaultNavigationOptions,
        initialRouteName: 'Databases'
      }
    ),
    EnvGroups: createStackNavigator(
      {
        AddEnvVar,
        CreateEnvGroup,
        EditEnvVar,
        EnvGroup,
        EnvGroups
      },
      {
        defaultNavigationOptions,
        initialRouteName: 'EnvGroups'
      }
    ),
    Settings: createStackNavigator(
      {
        Help,
        Settings
      },
      {
        defaultNavigationOptions,
        initialRouteName: 'Settings'
      }
    )
  },
  {
    initialRouteName: 'Services',
    tabBarComponent: TabBar,
    tabBarOptions: {
      style: {
        height: layout.icon.height + layout.margin * 2 + layout.border.width * 2
      }
    }
  }
)

const RootContainer = createAppContainer(RootNavigator)
const AppContainer = createAppContainer(AppNavigator)

const Render: FunctionComponent = () => {
  const [{ loading, token }, { init }] = useAuth()

  useEffect(() => {
    init()
  }, [init])

  if (loading) {
    return <Spinner />
  }

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <KeyboardView>
          {token ? <AppContainer /> : <RootContainer />}
        </KeyboardView>
      </ApolloProvider>
    </SafeAreaProvider>
  )
}

codePush.getUpdateMetadata().then(update => {
  if (update) {
    const { appVersion, label } = update

    Sentry.setRelease(`${appVersion}-codepush:${label}`)
  }
})

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  deploymentKey: CODE_PUSH_KEY,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
})(Render)
