import { AboutUs } from '@/components/About'
import { TrabalheHead } from "@/components/TrabalheImg.tsx"
import { ContainerTrabalhe } from '@/components/ContainerTrabalhe'
import { ContainerEnvie } from '@/components/ContainerEnvie'

export default function TrabalheConosco(){
	return(
		<div>
			<TrabalheHead></TrabalheHead>
      <div className='flex justify-between'>
        <ContainerTrabalhe></ContainerTrabalhe>
      </div>
		</div>
	)
}