import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import { SectionList, SectionListData } from 'react-native'

import {
  MenuHeader,
  MenuHeaderProps,
  MenuItem,
  MenuItemProps
} from '../../components/menu'
import { ProfileParams } from '../../navigators/profile'
import { useAuth } from '../../store/auth'

type Props = {
  navigation: StackNavigationProp<ProfileParams, 'Profile'>
  route: RouteProp<ProfileParams, 'Profile'>
}

export const ProfileScene: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => {
  const { formatMessage } = useIntl()

  const [
    { country, locale, theme },
    { setLocale, setTheme, signOut }
  ] = useAuth()

  const authMenu: MenuItemProps[] = [
    {
      icon: 'finger-print',
      key: 'auth_status',
      label: formatMessage({
        id: country
          ? 'screen__profile__profile__menu_auth_signed_in'
          : 'screen__profile__profile__menu_auth_not_signed_in'
      })
    }
  ]

  if (country) {
    authMenu.push({
      icon: 'log-out',
      key: 'auth_sign_out',
      label: formatMessage({
        id: 'screen__profile__profile__menu_auth_sign_out'
      }),
      onPress: () => signOut()
    })
  }

  const locationMenu: MenuItemProps[] = [
    {
      forward: true,
      icon: 'map',
      key: 'location_map',
      label: formatMessage({
        id: 'screen__profile__profile__menu_location_map'
      }),
      onPress: () => navigate('Map')
    },
    {
      forward: true,
      icon: 'wifi',
      key: 'location_ip',
      label: formatMessage({
        id: 'screen__profile__profile__menu_location_wifi'
      }),
      onPress: () => navigate('IP')
    },
    {
      forward: true,
      icon: 'list',
      key: 'location_list',
      label: formatMessage({
        id: 'screen__profile__profile__menu_location_list'
      }),
      onPress: () => navigate('List')
    }
  ]

  if (country) {
    locationMenu.unshift({
      icon: 'location',
      key: 'location',
      label: country
    })
  }

  const sections: SectionListData<MenuItemProps, MenuHeaderProps>[] = [
    {
      data: authMenu,
      description: formatMessage({
        id: 'screen__profile__profile__menu_auth_description'
      }),
      title: formatMessage({
        id: 'screen__profile__profile__menu_auth_title'
      })
    },
    {
      data: locationMenu,
      description: formatMessage({
        id: 'screen__profile__profile__menu_location_description'
      }),
      title: formatMessage({
        id: 'screen__profile__profile__menu_location_title'
      })
    },
    {
      data: [
        {
          icon: theme === 'light' ? 'checkmark-circle' : 'radio-button-off',
          key: 'appearance_light',
          label: formatMessage({
            id: 'screen__profile__profile__menu_appearance_theme_light'
          }),
          onPress: () => setTheme('light')
        },
        {
          icon: theme === 'dark' ? 'checkmark-circle' : 'radio-button-off',
          key: 'appearance_dark',
          label: formatMessage({
            id: 'screen__profile__profile__menu_appearance_theme_dark'
          }),
          onPress: () => setTheme('dark')
        },
        {
          icon: theme === 'custom' ? 'checkmark-circle' : 'radio-button-off',
          key: 'appearance_custom',
          label: formatMessage({
            id: 'screen__profile__profile__menu_appearance_theme_custom'
          }),
          onPress: () => setTheme('custom')
        }
      ],
      description: formatMessage({
        id: 'screen__profile__profile__menu_appearance_description'
      }),
      title: formatMessage({
        id: 'screen__profile__profile__menu_appearance_title'
      })
    },
    {
      data: [
        {
          icon: locale === 'en' ? 'checkmark-circle' : 'radio-button-off',
          key: 'locale_en',
          label: formatMessage({
            id: 'screen__profile__profile__menu_locale_locale_en'
          }),
          onPress: () => setLocale('en', false)
        },
        {
          icon: locale === 'ar' ? 'checkmark-circle' : 'radio-button-off',
          key: 'locale_ar',
          label: formatMessage({
            id: 'screen__profile__profile__menu_locale_locale_ar'
          }),
          onPress: () => setLocale('ar', true)
        },
        {
          icon: locale === 'ur' ? 'checkmark-circle' : 'radio-button-off',
          key: 'locale_ur',
          label: formatMessage({
            id: 'screen__profile__profile__menu_locale_locale_ur'
          }),
          onPress: () => setLocale('ur', true)
        }
      ],
      description: formatMessage({
        id: 'screen__profile__profile__menu_locale_description'
      }),
      title: formatMessage({
        id: 'screen__profile__profile__menu_locale_title'
      })
    }
  ]

  return (
    <SectionList
      renderItem={({ item }) => <MenuItem {...item} />}
      renderSectionHeader={({ section: { description, title } }) => (
        <MenuHeader description={description} title={title} />
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}
