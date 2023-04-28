import assopoc from '../../public/images/assopoc.png';
import healthlab from '../../public/images/healthlab.png';
import rcs from '../../public/images/rcs.png';
import animahub from '../../public/images/anihub.png';
import unibh from '../../public/images/unibh.png';
import galo from '../../public/images/galo.png';
import Image from 'next/image';

export function Footer(){
	return (
		<div className="bg-footer flex flex-row items-center justify-evenly text-white text-lg">
				<h3>Em Parceria com </h3>
				<Image src={assopoc} alt='assopoc'/>
				<Image src={healthlab} alt='assopoc'/>
				<Image src={rcs} alt='assopoc'/>
				<Image src={animahub} alt='assopoc'/>
				<Image src={unibh} alt='assopoc'/>
				<h3>Apoio</h3>
				<Image src={galo} alt='assopoc'/>
		</div>
	)
};