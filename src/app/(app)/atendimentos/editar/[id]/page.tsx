'use client';
import { AtendimentosList } from "@/components/AtendimentosList";
import { ContainerAtendimento } from "@/components/ContainerAtendimento";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import atendimentoService from "@/services/atendimentoService";
import hospedeService from "@/services/hospedeService";
import sistemaService from "@/services/sistemaService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { toast, Toaster } from "sonner";
  
export default function EditarAtendimento(){
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    const [data, setData] = useState();
    const [atendimentosData, setAtendimentosData] = useState([]);
    const [dataTosend, setDataToSend] = useState([]);
    const [isConfirmedArr, setIsConfirmedArr] = useState([]);
    const { getHospedeById } = hospedeService;
    const { getAtendimentoByHospedeId, editAtendimentoById } = atendimentoService;
    const pathname = usePathname();
    const router = useRouter();
    const [canEdit, setCanEdit] = useState(false);
    const { generateDownloadURL } = sistemaService;

    function getAttachmentName(attachmentKey: string){
		const start = attachmentKey.search("-");
		return(attachmentKey.slice(start+1));
	}

	async function getDownloadUrl(key:string){
		try {
			const url = await generateDownloadURL(key);
			const res = await fetch(url);
			const blob = await res.blob();
			const blobUrl = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = blobUrl;
			a.download = getAttachmentName(key);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(blobUrl); // Clean up the URL object
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	}

	function getAge(dateString: string) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}
 
    useEffect(() => {
        async function fecth(){
            const res1 = await getHospedeById(Number(pathname.substring(21)), user.token);
            const res2 = await getAtendimentoByHospedeId(Number(pathname.substring(21)), user.token);
            setAtendimentosData(res2.data);
            setData(res1.data);
        }
        fecth();
    }, []);

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        if(dataTosend.length == 0){
            atendimentosData.map((item) => {
                setDataToSend(state => [...state, item])
            })
        }
        if(isConfirmedArr.length < atendimentosData.length){
            return toast.error('Confirme a alteração antes de enviar')
        }
        const res = await editAtendimentoById(Number(pathname.substring(21)), dataTosend, user.token);
        if(res.type == "SUCCESS"){
            toast.success("Ação realizada com sucesso!");{}
            router.push("/atendimentos");
        }else{
            toast.error("Algo não está certo.Tente novamente!");
            return;
        }
    }

    return(
        <div className="min-h-screen">
            <Toaster richColors/>
            <ContainerAtendimento/>
            <SetorInfo setor="Atendimentos"/>
            <div className="m-10 bg-white p-8 rounded-lg shadow-xl space-y-4">
                <div className="flex space-x-5">
                    <div className="flex flex-col">
                        <h3 className="font-bold">{data?.hospedeData.idHOSPEDE}<span className="text-button"> {data?.hospedeData.NOME_COMPLETO}</span></h3>
                        <ul className="columns-2 gap-x-4">
                            <li>Dia de entrada: {new Date(data?.hospedeData.DATA_ENTRADA.substring(0, 10)).toLocaleDateString("pt-BR")}</li>
                            <li>Idade: {getAge(data?.hospedeData.DATA_NASCIMENTO.substring(0, 10))} anos</li>
                            <li>Nível de dependencia: {data?.dadosMedicosDoencasAlergiasDietasData.GRAU_DEPENDENCIA}</li>
                            <li>Leito: {data?.hospedagemData.LEITO}</li>
                            <li>Nº Quarto: {data?.hospedagemData.QUARTO}</li>
                            <li>Responsavel: {data?.hospedeData.RESPONSAVEL}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className="text-center font-bold text-lg">Anexos</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {atendimentosData && (
                            //@ts-ignore
                            atendimentosData.map((atendimento) => (
                                <div className="border-2 rounded shadow-md p-2" key={atendimento.idATENDIMENTO}>
                                    <h4 className="text-lg">Nome: {getAttachmentName(atendimento.ANEXO)}</h4>
                                    <button type="button" className="w-full mt-4 bg-button text-white py-2 px-4 rounded-lg hover:bg-button-hover transition" onClick={() => {getDownloadUrl(atendimento.ANEXO)}}>Baixar</button>
                                </div>
                            )) 
                        )}
                    </div>
                </div>
                <div className="flex space-x-4">
                    {!canEdit && (
                        <MyButton buttonText="Editar" handleClick={() => { setCanEdit(!canEdit) }} hidden={["SOCIAL", "ADMIN", "SAUDE-Atendimentos"].includes(user.user.access) ? false : true}/>
                    )}
                </div>
                <div>
                    <div className="flex space-x-2 mt-4 mb-1 w-full mr-24">
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Data do atendimento
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Aréa da saúde
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Médico
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Motivo
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Procedimento realizado
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Recomendações
                        </h2>
                        <button type="button" className={!canEdit ? "hidden" : "bg-white"} disabled={true}>
                            <MdCheckCircleOutline size={24} className="text-white" />
                        </button>
                    </div>
                    <form onSubmit={(e: React.SyntheticEvent) => {return handleSubmit(e)}}>
                        {atendimentosData && (
                            //@ts-ignore
                            atendimentosData.map((atendimento) => (
                                <div  className="flex space-x-2 mb-1 w-full" key={atendimento.idATENDIMENTO}>
                                    <AtendimentosList canEdit={canEdit}  data={atendimento} setDataToSend={setDataToSend} confirmArr={setIsConfirmedArr}/>
                                </div>
                            )) 
                        )}
                        {canEdit && (
                            <div className="flex justify-end m-2">
                                <MyButton buttonText="Salvar" buttonType="submit"/>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}