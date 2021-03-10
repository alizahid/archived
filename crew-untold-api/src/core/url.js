import googl from 'goo.gl'

googl.setKey(process.env.GOOGL_KEY)

export default url => googl.shorten(url)
