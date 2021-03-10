export { default as img_render } from './img/render.png'

export { default as img_github } from './img/github.png'
export { default as img_gitlab } from './img/gitlab.png'

export { default as img_dark_add } from './img/dark/add.png'
export { default as img_dark_back } from './img/dark/back.png'
export { default as img_dark_copy } from './img/dark/copy.png'
export { default as img_dark_edit } from './img/dark/edit.png'
export { default as img_dark_expand } from './img/dark/expand.png'
export { default as img_dark_help } from './img/dark/help.png'

export { default as img_light_edit } from './img/light/edit.png'
export { default as img_light_remove } from './img/light/remove.png'
export { default as img_light_resume } from './img/light/resume.png'
export { default as img_light_suspend } from './img/light/suspend.png'

export { default as img_service_builds } from './img/service/builds.png'
export { default as img_service_disks } from './img/service/disks.png'
export { default as img_service_environment } from './img/service/environment.png'
export { default as img_service_events } from './img/service/events.png'
export { default as img_service_headers } from './img/service/headers.png'
export { default as img_service_info } from './img/service/info.png'
export { default as img_service_logs } from './img/service/logs.png'
export { default as img_service_metrics } from './img/service/metrics.png'
export { default as img_service_pull_requests } from './img/service/pull_requests.png'
export { default as img_service_redirects } from './img/service/redirects.png'
export { default as img_service_settings } from './img/service/settings.png'
export { default as img_service_sharing } from './img/service/sharing.png'

import { ImageSourcePropType, TextStyle } from 'react-native'

import img_event_build_cancelled from './img/events/build_cancelled.png'
import img_event_build_failed from './img/events/build_failed.png'
import img_event_build_started from './img/events/build_started.png'
import img_event_build_succeeded from './img/events/build_succeeded.png'
import img_event_cron_job_cancelled from './img/events/cron_job_cancelled.png'
import img_event_cron_job_started from './img/events/cron_job_started.png'
import img_event_cron_job_succeeded from './img/events/cron_job_succeeded.png'
import img_event_cron_job_triggered from './img/events/cron_job_triggered.png'
import img_event_default from './img/events/default.png'
import img_event_deployment_cancelled from './img/events/deployment_cancelled.png'
import img_event_deployment_failed from './img/events/deployment_failed.png'
import img_event_deployment_started from './img/events/deployment_started.png'
import img_event_deployment_succeeded from './img/events/deployment_succeeded.png'
import img_event_info from './img/events/info.png'
import img_event_server_available from './img/events/server_available.png'
import img_event_server_failed from './img/events/server_failed.png'
import img_event_service_resumed from './img/events/service_resumed.png'
import img_event_service_suspended from './img/events/service_suspended.png'
import img_nav_databases_active from './img/nav/active/databases.png'
import img_nav_environments_active from './img/nav/active/environments.png'
import img_nav_services_active from './img/nav/active/services.png'
import img_nav_settings_active from './img/nav/active/settings.png'
import img_nav_databases from './img/nav/databases.png'
import img_nav_environments from './img/nav/environments.png'
import img_nav_services from './img/nav/services.png'
import img_nav_settings from './img/nav/settings.png'
import img_services_cron_job from './img/services/cron_job.png'
import img_services_private_service from './img/services/private_service.png'
import img_services_web_service from './img/services/web_service.png'

export const colors = {
  background: '#fff',
  backgroundDark: '#f6f7f8',
  border: '#ecf0f1',
  foreground: '#111',
  foregroundLight: '#888',
  modal: 'rgba(0, 0, 0, 0.75)',
  primary: '#4abb3f',

  state: {
    error: '#ff3b30',
    message: '#007aff',
    success: '#4cd964',
    warning: '#ff9500'
  },
  status: {
    available: '#4cd964',
    creating: '#ff9500',
    failed: '#ff3b30',
    running: '#4cd964',
    succeeded: '#4cd964',
    suspended: '#ff9500'
  }
}

export const fonts: Record<string, TextStyle> = {
  code: {
    fontFamily: 'IBM Plex Mono',
    fontSize: 16
  },
  codeSmall: {
    fontFamily: 'IBM Plex Mono',
    fontSize: 12
  },
  regular: {
    fontFamily: 'CircularStd-Book',
    fontSize: 16
  },
  small: {
    fontFamily: 'CircularStd-Book',
    fontSize: 12
  },
  subtitle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 20,
    fontWeight: '500'
  },
  title: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 40,
    fontWeight: '600'
  }
}

export const weights: Record<string, TextStyle> = {
  codeMedium: {
    fontWeight: '500'
  },
  medium: {
    fontFamily: 'CircularStd-Medium'
    // fontWeight: '500'
  }
}

export const layout = {
  border: {
    radius: 4,
    width: 1
  },
  button: {
    height: 50
  },
  icon: {
    height: 20,
    width: 20
  },
  logo: {
    height: 100,
    width: 100
  },
  margin: 20,
  navBar: {
    height: 50
  },
  padding: 10,
  textBox: {
    height: 50
  }
}

export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    height: 0,
    width: 0
  },
  shadowOpacity: 0.125,
  shadowRadius: 5
}

export const nav: Record<string, Record<string, ImageSourcePropType>> = {
  Databases: {
    active: img_nav_databases_active,
    base: img_nav_databases
  },
  EnvGroups: {
    active: img_nav_environments_active,
    base: img_nav_environments
  },
  Services: {
    active: img_nav_services_active,
    base: img_nav_services
  },
  Settings: {
    active: img_nav_settings_active,
    base: img_nav_settings
  }
}

export const services: Record<string, ImageSourcePropType> = {
  cron: img_services_cron_job,
  pserv: img_services_private_service,
  web: img_services_web_service
}

export const serviceEvents = {
  build: {
    cancelled: img_event_build_cancelled,
    failed: img_event_build_failed,
    started: img_event_build_started,
    succeeded: img_event_build_succeeded
  },
  cronJob: {
    cancelled: img_event_cron_job_cancelled,
    started: img_event_cron_job_started,
    succeeded: img_event_cron_job_succeeded,
    triggered: img_event_cron_job_triggered
  },
  default: img_event_default,
  deployment: {
    cancelled: img_event_deployment_cancelled,
    failed: img_event_deployment_failed,
    started: img_event_deployment_started,
    succeeded: img_event_deployment_succeeded
  },
  info: img_event_info,
  server: {
    available: img_event_server_available,
    failed: img_event_server_failed
  },
  service: {
    resumed: img_event_service_resumed,
    suspended: img_event_service_suspended
  }
}
