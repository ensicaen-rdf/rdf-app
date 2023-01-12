import { SetStateAction, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonButton, useIonToast, IonText } from '@ionic/react';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useHistory } from 'react-router-dom';

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
          <IonTitle>Connexion</IonTitle>
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
  const message = "Id : " + props.testid + " --- mdp : " + props.testmdp;
  var statusResponse = 0;
  var tokenAuth: void ;
  const [hidden, setHidden] = useState(true);
  const history = useHistory();

  const presentToast = () => {
    present({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    fetch('http://192.168.3.111:3000/auth/', {
    method: 'POST',
    body: JSON.stringify({
      username:props.testid,
      password:props.testmdp,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
    }).then(function(response){statusResponse = response.status})
      .then(function(data)
      {tokenAuth = data;}).catch(error => setHidden(false));
    
    if (statusResponse == 201) {
      setHidden(true);
      history.replace('/profil',[tokenAuth]);
    } else {
      setHidden(false);
    }
    console.log(hidden);

  };

  return (
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
