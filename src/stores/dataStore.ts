import { defineStore } from 'pinia'

type Locale = 'en'  | 'fr-FR' | 'nl'

interface Data {
  logo: string
  research_head: string
  research_lead: string
  explanation_short: {
    en: string
    nl: string
    'fr-FR': string
  }
}

interface State {
  data: Data
  locale: Locale
  loading: boolean
  error: unknown
}

export const useDataStore = defineStore('data', {
  state: () =>
    ({
      locale: 'en',
      data: {
        logo: '',
        research_head: '',
        research_lead: '',
        explanation_short: {
          en: '',
          'fr-FR': '',
          nl: ''
        }
      },
      loading: false,
      error: null
    }) as State,
  actions: {
    async getData() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('http://localhost:3000/api/data')
        const parsed = await response.json()

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        parsed.forEach((e: {[k: string]: string }) => {
          console.log(e)
          const { research_head, research_lead, logo, locale, explanation_short } = e
          if (logo) this.data.logo = logo
          if (research_head) this.data.research_head = research_head
          if (research_lead) this.data.research_lead = research_lead
          if (locale) this.data.explanation_short[locale as Locale] = explanation_short
        })
      } catch (error) {
        this.error = 'Error fetching data'
      } finally {
        this.loading = false
      }
    },

    setLocale(locale: Locale): any {
      this.locale = locale
    }
  }
})
