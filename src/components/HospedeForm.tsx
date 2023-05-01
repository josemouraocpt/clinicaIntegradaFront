'use client'

import { MyButton } from "./MyButton";
import { useState } from "react";
import { DadosBasicos } from "./DadosBasicos";
import { DadosBancarios } from "./DadosBancarios";
import { DadosMedicos } from "./DadosMedicos";
import { DadosHospedagem } from "./DadosHospedagem";
import { DadosResponsavel } from "./DadosResponsavel";
import { DadosTermo } from "./DadosTermo";
import { FinalHospedeForm } from "./FinalHospedeForm";

const formSteps = [<DadosBasicos/>, <DadosBancarios/>, <DadosMedicos/>, <DadosHospedagem/>, <DadosResponsavel/>, <DadosTermo/>, <FinalHospedeForm/>]

export function HospedeForm(){
	const [currentStep, setCurrentStep] = useState(0);

	const handleNext = () => {
		setCurrentStep(state => state + 1)
	};

	const handlePrevius = () => {
		setCurrentStep(state => state - 1)
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	return(
		<div className="bg-white p-5 rounded-md shadow-lg">
			<form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
				{formSteps[currentStep]}
					<div className="flex justify-end space-x-3">
						{currentStep !== 6 && (
							<>
								{currentStep >= 1 && (
									<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handlePrevius}>Voltar</button>
								)}
								<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handleNext}>Próximo</button>
							</>
						)}
						{currentStep == 6 && (
							<button onClick={handleSubmit} className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover">Finalizar</button>
						)}
					</div>
			</form>
		</div>
	)
};