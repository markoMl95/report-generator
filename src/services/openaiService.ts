import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const summarizeReport = async (
  content: string,
  systemContent?: string,
): Promise<string> => {
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [
  //     {
  //       role: 'system',
  //       content: `${systemContent}` aka 'generate me this and that, depending on draft, summarize etc'
  //     },
  //     { role: 'user', content: `Summarize this report: ${content}` },
  //   ],
  // })
  //
  // return response.choices[0].message.content ?? 'No summary available.'
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  // because of the mocking purpose

  if (systemContent) {
    return `This is some returned generated report where {title: 'Some title', description: 'Some description'}`
  }

  return `Summary: This mocked report summarize and its about "${content}"`
}

export default openai
