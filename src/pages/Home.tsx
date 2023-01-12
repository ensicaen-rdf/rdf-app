import {SetStateAction, useState} from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonButton, useIonToast, IonText} from '@ionic/react';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [id, setButtonId] = useState('');
  const [mdp, setButtonMdp] = useState('');

  function handleInputId(event: { target: any; }) {
    setButtonId(event.target.value);
    console.log(id);
  }

  function handleInputMdp(event: { target: any; }) {
    setButtonMdp(event.target.value);
    console.log(mdp);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connection</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel id="labelId" position="floating">Nom d'utilisateur :</IonLabel>
          <IonInput clearInput={true} id="id" name="id" onIonChange={handleInputId}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel id="labelPw" position="floating">Mot de passe :</IonLabel>
          <IonInput clearInput={true} type="password" id="pw" onIonChange={handleInputMdp}></IonInput>
        </IonItem>
        <ConnectionButton testid={id} testmdp={mdp} />
      </IonContent>
    </IonPage>
  );  
};

function ConnectionButton(props: { testid: string; testmdp: string; }) {
  const [present] = useIonToast();
  const message = "Id : "+props.testid+" --- mdp : "+props.testmdp;
  const fauxBonId = "ouioui";
  const fauxBonMdp = "taxi";
  const [hidden,setHidden] = useState(true);

  const presentToast = () => {
    present({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    if (fauxBonId!=props.testid || fauxBonMdp!=props.testmdp){
      setHidden(false);
    } else {
      setHidden(true);
      return(<Link to="/profile" ></Link>);
    }
    console.log(hidden);
  };

  return(
    <IonItem>
      <IonButton color="success" shape="round" expand='block' onClick={() => presentToast()}>
        Connection
      </IonButton>
      <IonText color="danger" hidden={hidden}>
        Compte invalide
      </IonText>
    </IonItem>
  );
}

function api() {

}

export default Home;
