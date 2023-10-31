import { Header } from "../../components/Header";

import github_w8jonas from "../../assets/github_w8jonas.png"
import github_caio from "../../assets/github_caio.png"


export function StudentsPage() {

    return (
        <div>
            <Header />

            <div style={{maxWidth: 1300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto'}}>

                <br/>
                <br/>
                <h1>Participantes</h1>
                <br/>

                <h3>Caio Henrique Vieira</h3>
                <img src={github_caio} alt="Perfil Github Caio" />
                <br/>

                <h3>Jonas Henrique Nascimento</h3>
                <img src={github_w8jonas} alt="Perfil Github Jonas" />
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    )
}
