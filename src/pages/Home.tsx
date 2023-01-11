import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
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
        <ExploreContainer />
        <IonItem>
          <IonLabel id="labelId" position="floating">Nom d'utilisateur :</IonLabel>
          <IonInput clearInput={true} id="id"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel id="labelPw" position="floating">Mot de passe :</IonLabel>
          <IonInput clearInput={true} type="password" id="pw"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
