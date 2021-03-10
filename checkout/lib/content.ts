import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'

import { PrismicReconciliation, Reconciliation } from '../types'

class Content {
  client = Prismic.client('https://checkout-test.cdn.prismic.io/api/v2')

  async fetch(): Promise<Reconciliation> {
    const { data } = await this.client.getByUID(
      'reconciliation',
      'test-reconciliation',
      {}
    )

    const {
      body: [
        {
          primary: { description, features_list, features_list_icon, title }
        }
      ]
    } = data as PrismicReconciliation

    return {
      description: RichText.asText(description),
      features: features_list.map(({ text }) => text),
      icon: features_list_icon.url,
      title: RichText.asText(title)
    }
  }
}

export const content = new Content()
