import React , {useContext, useEffect} from 'react';
import noteContext from '../../context/noteContext';

const About = () => {
  const states = useContext(noteContext);
  useEffect(() => {
    states.update()
    // eslint-disable-next-line
  }, []);
  //for one time run empty array
  return (
    <>
    <div>
      The information is about {states.state.name} and my martial status is {states.state.status}
    </div>
    </>
  )
}

export default About
