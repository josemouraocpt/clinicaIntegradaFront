import Card from "@/components/Card";
import Search from "@/components/Search";
import Link from "next/link";

export default function Dashboard(){
	return(
		<div>
			<Search/>
			<h1>Dashboard</h1>
			<Card/>
		</div>
	)
};
