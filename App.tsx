import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

// NOTE: Update path to this project here, couldn't get `__dirname` to work
const VIDEO_ASSET_URI = '/Users/brunops/code/mem-leak-test/assets/video-test.MOV';

async function postFormData(
  apiUrl: string,
  fileUri: string,
  fileName: string,
  mimeType: string,
  additionalData: object = {
}): Promise<XMLHttpRequest> {
  const data = {
    uri: fileUri,
    type: mimeType,
    name: fileName,
    filename: fileName
  }
  const body = new FormData();

  for (const k in additionalData) {
    body.append(k, additionalData[k]);
  }

  // append file
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body.append('file', data as any);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    console.log(`posting file: ${fileName}`)

    xhr.addEventListener('load', () => {
      // console.log('XHR Load listener triggered', xhr)
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      }
      else {
        reject(xhr);
      }
    });

    xhr.addEventListener('error', e => {
      console.log('XHR ERROR listener'),
      reject(e)
    });
    xhr.addEventListener('timeout', e => {
      console.log('XHR TIMEOUT listener'),
      reject(e)
    });
    
    xhr.addEventListener('abort', reject);
    xhr.open('POST', apiUrl);
    xhr.send(body);
  });
}

export default function App() {

  const handleClick = async () => {
    console.log('Button clicked, posting video...')

    try {
      await postFormData(
        'http://localhost:3000/', 
        VIDEO_ASSET_URI,
        'Video file name', 
        'video/quicktime', 
        {}
      )

      console.log('Upload success')

    } catch (e) {
      console.error('Error posting video')

      // Triggering Garbage Collection makes no difference
      gc()
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <Text>Post video</Text>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
