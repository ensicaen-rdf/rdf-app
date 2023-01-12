import { useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, useIonToast, IonText } from '@ionic/react';
import './Home.css';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const [id, setButtonId] = useState('');
  const [mdp, setButtonMdp] = useState('');

  function handleInputId(event: { target: any; }) {
    setButtonId(event.target.value);
  }

  function handleInputMdp(event: { target: any; }) {
    setButtonMdp(event.target.value);
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
            <IonTitle size="large">Connexion</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel id="labelId" position="floating">Id d'authentification :</IonLabel>
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
  var statusResponse = 0;
  const [hidden, setHidden] = useState(true);
  const history = useHistory();

  const authenttification = () => {
    fetch('http://192.168.3.111:3000/auth/', {
    method: 'POST',
    body: JSON.stringify({
      username:props.testid,
      password:props.testmdp,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
    }).then(function(response){statusResponse = response.status;
      console.log(response); return response.json()})
      .then(function(data)
      {
        if (statusResponse == 201) {
          setHidden(true);
          console.log(data.token);
          history.replace('/profil',[data.token]);
        } else {
          setHidden(false);
        }
      }).catch(error => setHidden(false));
  };

  return (
    <IonItem>
      <IonItem>
        <IonButton color="success" shape="round" expand='block' onClick={() => authenttification()}>
          Connexion
        </IonButton>
      </IonItem>
      <IonText color='danger' hidden={hidden}>
        Compte invalide
      </IonText>
    </IonItem>
  );
}

export default Home;
