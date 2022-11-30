import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  const [labeledPrompts, setLabeledPrompt] = useState(null);
  const [allPrompts, setAllPrompts] = useState(null);

  useEffect(()=> {
    axios.get('/prompts')
      .then(resp => {
        setLabeledPrompt(resp.data.prompts);
      })
    setAllPrompts([
      'a_dog_eating_a_cake',
      'baseball',
      'basketball',
      'building',
      'cat',
      'cow',
      'salmon',
      'soccer',
      'tree',
      'tube',
      'worldcup',
      'wordlcup',
      '(test)',
    ])
  }, [])

  return (
    <>
      <div>
        <h2 style={{ marginBottom: 0 }}>All Data</h2>
        <p style={{ marginTop: 0 }}>Stable Diffusion이 생성한 모든 이미지</p>
        {allPrompts && allPrompts.map(prompt => (
          <Row>
            <Link to={`prompt/${prompt}`}>
              {prompt}
            </Link>
          </Row>
        ))}
      </div>

      <div>
        <h2 style={{ marginBottom: 0 }}>Labeled Data</h2>
        <p style={{ marginTop: 0 }}>실험 과정에서 생성되어 visited와 selected 값이 라벨링 된 이미지</p>
        {labeledPrompts && labeledPrompts.map(prompt => (
          <Row>
            <Link to={`prompt/${prompt}`}>
              {prompt}
            </Link>
          </Row>
        ))}
      </div>
    </>
  )
}

export default Home;
