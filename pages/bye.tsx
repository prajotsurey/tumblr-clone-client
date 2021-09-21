import React from 'react'
import { useByeQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

interface byeProps {

}

const bye: React.FC<byeProps> = ({}) => {
  const { data} = useByeQuery()
  return (<>
    {/* {data.bye} */}
  </>);
}

export default withApollo({ ssr: false })(bye);