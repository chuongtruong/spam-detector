import { useEffect, useState } from 'react';
import { Grommet } from 'grommet';
import { Box, Text, Grid, FormField, TextInput, Button, Form } from 'grommet';
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

const ResultCard = (({algorithmNo, label}) => {
  return (
    <Box>
      <Text>{algorithmNo}</Text>
      <Text>{label}</Text>
    </Box>
    
  );
})

function App() {
  const BACK_END_URL = '20.62.247.217';

  const [inputValue, setInputValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();
  const [err, setErr] = useState('');


  // for local testing purpose only
  const SAMPLE_RETURN_RESULT = {
    'input': 'sample text',
    'label1': '1',
    'label2': '1',
  }
  
  const handleSubmit = async () => {
    setIsLoading(true);
    try {  
      const response = await fetch( BACK_END_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: JSON.stringify({
            'input': `${inputValue}`
          })
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        console.log('result is: ', JSON.stringify(await response.json(), null, 4));
        
        setResult(result)
    } catch (err) {
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
            round 
            background="light-1" 
            pad={{'left': 'large', 'right': 'large', 'top': 'large', 'bottom': 'large'}}
            style={{ 'min-height': '75vh' }}>
              {/* form starts here   */}
              <Form
                onChange={nextValue => setInputValue(nextValue)}
                onReset={() => setInputValue({})}
                onSubmit={({ value }) => {}}>
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
                {/* {result && {
                  [
                    ['Alogrithm 1', 'label1'], 
                    ['Alogrithm 1', 'label1']
                  ].map((algo,label)=> {
                    (<ResultCard
                      algorithmNo={algo}, 
                      label={label}
                      />)
                  })
                }
              } */}
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
                  by <Text weight='bold'>Chuong Truong</Text>&nbsp;&nbsp;<FaGithubSquare/> <FaLinkedin/>
                  <br/>
                     &nbsp;&nbsp;&nbsp;<Text weight='bold'>Chirag Kaudan</Text>&nbsp;&nbsp;<FaGithubSquare/> <FaLinkedin/>
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
