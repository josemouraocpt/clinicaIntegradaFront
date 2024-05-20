import assopoc from '../../public/images/footer/assopoc150.png';
import healthlab from '../../public/images/footer/HEALTHLAB150.png';
import rcs from '../../public/images/footer/rcs 1.png';
import animahub from '../../public/images/footer/animalab_hub450.png';
import unibh from '../../public/images/footer/unibh200.png';
import galo from '../../public/images/footer/apoio_galo.png';
import Image from 'next/image';

export function Footer(){
	return (
		<div className="bg-footer flex flex-row items-center justify-evenly text-lg absolute bottom-0 left-0 w-full">
				<h3>Em Parceria com </h3>
				<Image src={assopoc} alt='assopoc' width={100} />
				<Image src={healthlab} alt='Health Lab' width={100}/>
				<Image src={rcs} alt='RCS' width={120}/>
				<Image src={animahub} alt='Anima hub' width={120}/>
				<Image src={unibh} alt='Unibh' width={100}/>
				<h3>Apoio</h3>
				<Image src={galo} alt='Galo' width={100}/>
		</div>
	)
};