import f from 'fluent-schema'

export const schemas = {
  currency: f
    .object()
    .id('#currency')
    .prop('id', f.integer())
    .prop(
      'data',
      f
        .object()
        .prop('symbol', f.string())
        .prop('name', f.string())
        .prop('rank', f.integer())
    ),
  meta: f
    .object()
    .id('#meta')
    .prop('items', f.integer())
    .prop('page', f.integer()),
  person: f
    .object()
    .id('#person')
    .prop('id', f.integer())
    .prop('data', f.object().prop('name', f.string()))
}
