import { RichTextBlock } from 'prismic-reactjs'

export type PrismicReconciliation = {
  body: {
    primary: {
      title: RichTextBlock[]
      description: RichTextBlock[]
      features_list_icon: RichTextBlock
      features_list: RichTextBlock[]
    }
  }[]
}

export type Reconciliation = {
  title: string
  description: string
  features: string[]
  icon: string
}
