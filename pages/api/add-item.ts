// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Client } from "@notionhq/client"

const notion = new Client({
	auth: "secret_gmlF7bUKh05yN0Plgv7OfBHuFeeZVK65GPW2hUMoyuk",
})

const databaseId = "01c3b8b792064aa697377574866db319"

async function addItem(name: string) {
	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				title: [
					{
						text: {
							content: name,
						},
					},
				],
			},
		})
		console.log(response)
	} catch (error) {
		console.log("hh")
		console.error(JSON.stringify(error))
	}
}

type Data = {
	message: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const { name } = req.query

	if (name == null) {
		return res.status(400).json({ message: "no name" })
	}

	try {
		await addItem(String(name))
		res.status(200).json({ message: `Success ${name} added` })
	} catch (error) {
		return res.status(400).json({ message: "no name" })
	}

	res.status(200).json({ message: `Success ${name} added` })
}
