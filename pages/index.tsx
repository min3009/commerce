import React, { useRef, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"

export default function Home() {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		if (inputRef.current == null || inputRef.current.value == "") {
			alert("name을 넣어주세요")
			return
		}
		fetch(`/api/add-item?name=${inputRef.current.value}`)
			.then((res) => res.json())
			.then((data) => alert(data.message))
	}
	return (
		<>
			<main>
				<input ref={inputRef} type="text" placeholder="name"></input>
				<button onClick={handleClick}>add jacket</button>
			</main>
		</>
	)
}
