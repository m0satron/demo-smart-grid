import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(cors());
const port = 3000;

const strapiURL = process.env.API_URL

interface Attributes {
  locale: string;
  logo: string
  research_head: string
  research_lead: string
  explanation_short: {
    en: string
    nl: string
    'fr-FR': string
  }
}

app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${strapiURL}/api/demos/25?populate=*`);
    const {data} = await response.json();
    const { localizations, explanation_short, research_head, research_lead } = data.attributes
    const locales = localizations.data.map(({ attributes }: { attributes: Attributes }) => ({ locale: attributes.locale, explanation_short: attributes.explanation_short }))

    const airLogo = await fetch(`${strapiURL}/uploads/air_a5e1c08136.svg`);
    const logo = await airLogo.text()

    const content = [
      { logo },
      { research_head, research_lead },
      { locale: 'en', explanation_short }, 
      ...locales
    ]
    res.send(content);

  } catch (error) {
    console.error({error})
    res.status(500).send('Error fetching data from Strapi');
  }
});

app.listen(port, () => 
  console.info(`Server is running at http://localhost:${port}`)
);