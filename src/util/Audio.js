var Sound = require('react-native-sound');
Sound.setCategory('Playback');

export const Audio = (audio)=>{
    const WhooshMess =  new Sound(audio, Sound.MAIN_BUNDLE, (error) => {
    if(error){
        console.log('failed to load the sound', error);
        return;
        }
        // console.log('dda keeu')
        WhooshMess.play();
    })
       

}