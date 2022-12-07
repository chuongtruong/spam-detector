import { useEffect, useState } from 'react';
import { Grommet } from 'grommet';
import { Box, Text, Grid, FormField, TextInput, Button, Form, Spinner } from 'grommet';
import { FaAws, FaFlask, FaPython, FaDocker, FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';

const theme = {
  global: {
    font: {
      family: 'Monaco',
      size: '18px',
    },
  },
  button: {
    border: {
      color: 'black',
      width: '2px',
      radius: '10px',
    },
  }
};

const ResultCard = (({algorithmName, label, url}) => {
  return (
    <Box 
      border
      elevation='small'
      round='small'
      pad='small'
      hoverIndicator='true'
      style={{
        'min-width': '15vw',
        'min-height': '10vh'
      }}
      onClick={()=>{window.open(`${url}`)}}
      >
        <Text
          weight='bold'
          size='large'
        >
          {algorithmName}</Text>
        <Text>{label === 0 ? 'NOT SPAM' : 'SPAM'}</Text>
    </Box>
    
  );
})

function App() {
  const BACK_END_URL_LOCAL = 'http://localhost:5000/';
  const BACK_END_URL_AWS = 'https://20.62.247.217';

  const [inputValue, setInputValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();
  const [err, setErr] = useState('');


  // for local testing purpose only
  const SAMPLE_RETURN_RESULT = {
    "bert-tiny":{
      "label":0,
      "url":"https://huggingface.co/mrm8488/bert-tiny-finetuned-sms-spam-detection"
    },
    "roberta":{
      "label":0,
      "url":"https://huggingface.co/mariagrandury/roberta-base-finetuned-sms-spam-detection"
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "input": `${inputValue}`
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(BACK_END_URL_LOCAL, requestOptions)
        .then(response => response.text())
        .then(result => setResult(result))
        .catch(error => console.log('error', error));
    }
    catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grommet theme={theme}>
      <Box background="light-3" align="center" justify='center' style={{ 'min-height': '100vh' }}>
        <Box container  style={{ 'min-width': '70vw' }}>
          <Box  justify='center' align="center" style={{ 'min-height': '15vh' }}>
            <Text size='xxlarge' weight='bold'>SPAM TEXT DETECTOR</Text>
            <Text>CS-152 Programming Paradigm</Text>
          </Box>
          {/* main section starts here */}
          <Box
          elevation='medium' 
            round 
            background="light-1" 
            pad={{'left': 'large', 'right': 'large', 'top': 'large', 'bottom': 'large'}}
            style={{ 'min-height': '55vh' }}>
              {/* form starts here   */}
              <Form
                onChange={nextValue => setInputValue(nextValue['text-input'])}
                onReset={() => setInputValue({})}
                onSubmit={handleSubmit}>
                <FormField name="text-input" htmlFor="text-input-id" label="Input">
                  <TextInput id="text-input-id" name="text-input"  placeholder="Type here..." />
                </FormField>
                <Box direction="row" gap="medium" justify='end'>
                  <Button type="submit" label="Submit" />
                  <Button type="reset" label="Reset" />
                </Box>
              </Form>
              {/* form ends here   */}
              {/* results section starts here */}
              <Box 
                direction='rows'
                margin={{'top': '7px'}}
                gap='small'
                >
                {isLoading && <Spinner message="Loading results" /> }
                
                {/* Rendering hardcoded results to the UI */}
                { Object.keys(SAMPLE_RETURN_RESULT).map((algoName)=>{
                    console.log("SAMPLE_RETURN_RESULT[`${algoName}`]['label']", SAMPLE_RETURN_RESULT[`${algoName}`]['label']);
                    return(
                      <ResultCard
                        algorithmName={algoName}
                        label={SAMPLE_RETURN_RESULT[`${algoName}`]['label']}
                        url={SAMPLE_RETURN_RESULT[`${algoName}`]['url']}
                    />)
                  })
                } 
                {/* Rendering result (from backend) to the UI */}
                {/* { result && !err &&
                  Object.keys(result).map((algoName)=>{
                    return(
                      <ResultCard
                        algorithmName={algoName}
                        label={result[`${algoName}`]['label']}
                        url={result[`${algoName}`]['url']}
                    />)
                  })
                }  */}
              </Box>
               
              {/* results section ends here */}
          </Box>
          {/* main section ends here */}
          <Box  style={{ 'min-height': '10vh' }} margin={{'top': 'small'}}>
            <Grid
              rows={['','xxsmall']}
              columns={['2/3', '1/3']}
              areas={[
                ['made-with','made-by']]}>
              <Box gridArea="made-with" justify='center'>
                <Text size='medium' justifySelf='center'>
                  Made with <SiJavascript/> <FaPython/> <FaFlask/> <FaAws/> <FaDocker/>
                </Text>
              </Box>
              <Box gridArea="made-by" align='end'>
                <Text size='medium'>
                  by <Text weight='bold'>Chuong Truong</Text>&nbsp;&nbsp;
                  <FaGithubSquare 
                    style={{'cursor': 'pointer'}} 
                    onClick={()=>{window.open('https://github.com/chuongtruong')}}/>&nbsp;
                  <FaLinkedin 
                    style={{'cursor': 'pointer'}} 
                    onClick={()=>{window.open('https://www.linkedin.com/in/chuong-trg/')}}/>
                  <br/>
                     &nbsp;&nbsp;&nbsp;<Text weight='bold'>Chirag Kaudan</Text>&nbsp;&nbsp;
                     <FaGithubSquare 
                      style={{'cursor': 'pointer'}} 
                        onClick={()=>{window.open('YOUR_GITHUB_URL')}}/>&nbsp;
                     <FaLinkedin 
                      style={{'cursor': 'pointer'}} 
                      onClick={()=>{window.open('YOUR_LINKEDIN_URL')}}/>
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}


export default App;
