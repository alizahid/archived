class Render {
  getBuildStatus(status: number) {
    switch (status) {
      case 0:
        return 'created'

      case 1:
        return 'in progress'

      case 2:
        return 'succeeded'

      case 3:
        return 'failed'

      case 4:
        return 'cancelled'

      default:
        return 'unknown'
    }
  }

  getCronJobStatus(status: number) {
    switch (status) {
      case 1:
        return 'succeeded'

      case 2:
        return 'failed'

      case 3:
        return 'cancelled'

      default:
        return 'unknown'
    }
  }

  getDeployStatus(status: number) {
    switch (status) {
      case 0:
        return 'created'

      case 1:
        return 'in progress'

      case 2:
        return 'live'

      case 3:
        return 'deleted'

      case 4:
        return 'failed'

      case 5:
        return 'cancelled'

      default:
        return 'unknown'
    }
  }
}

export const render = new Render()
