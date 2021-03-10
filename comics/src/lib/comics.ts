import axios from 'axios'

class Comics {
  async getPages(id: string): Promise<number> {
    const url: {
      [id: string]: string
    } = {
      blastwave: 'http://www.blastwave-comic.com',
      darklegacy: 'https://www.darklegacycomics.com',
      lfg: 'https://www.lfg.co'
    }

    const { data } = await axios.get<string>(url[id])

    const regex: {
      [id: string]: RegExp
    } = {
      blastwave: /<option value="(\d+)">/,
      darklegacy: /var iLatestComic = (\d+)/,
      lfg: /location\.href='https:\/\/www\.lfg\.co\/page\/(\d+)\/'/
    }

    const matches = data.match(regex[id])

    if (matches) {
      const [, total] = matches

      return Number(total)
    }

    return 0
  }

  async getPage(id: string, number: number): Promise<string> {
    if (id === 'darklegacy') {
      return `http://www.darklegacycomics.com/comics/${number}.jpg`
    } else {
      const url: {
        [id: string]: string
      } = {
        blastwave: `http://www.blastwave-comic.com/index.php?p=comic&nro=${number}`,
        lfg: `https://www.lfg.co/page/${number}`
      }

      const { data } = await axios.get<string>(url[id])

      const regex: {
        [id: string]: RegExp
      } = {
        blastwave: /<img src=".\/comics\/(.*?)"/,
        lfg: /<meta property="og:image" content="(.*?)" \/>/
      }

      const matches = data.match(regex[id])

      if (matches) {
        const [, url] = matches

        if (id === 'blastwave') {
          return `http://www.blastwave-comic.com/comics/${url}`
        }

        return url
      }
    }

    return ''
  }
}

export const comics = new Comics()
