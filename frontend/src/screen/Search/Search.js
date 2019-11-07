import React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import CssTextField from '../../component/CssTextField/CssTextField';
function Search(props) {
  let { queryStr } = useParams();
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch('https://api.doctorsearch.me/api/search?q=' + queryStr)
      .then(results => results.json())
      .then(d => setData(d));
  }, [queryStr]);

  const handleChange = e => {
    setSearch(e.target.value);
  };
  const handleKey = e => {
    if (e.keyCode === 13 && search.length > 0) {
      console.log('searching for: ', search);
      props.history.push('/search/' + search);
    }
  };
  console.log(data);
  let cnt = 0;
  const doctors =
    data === null
      ? []
      : data.doctors.slice(0, 20).map(item => {
          cnt += 1;
          return (
            <div key={cnt} style={{ paddingBottom: '1em' }}>
              <h3
                onClick={() => {
                  props.history.push('/doctors/' + item.id);
                }}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                {' '}
                {item.name}{' '}
              </h3>
              <p>{item.bio.length > 100 ? item.bio.slice(0, 200) + '...' : item.bio}</p>
            </div>
          );
        });
  const cities =
    data === null
      ? []
      : data.cities.slice(0, 20).map(item => {
          cnt += 1;
          return (
            <div key={cnt} style={{ paddingBottom: '1em', lineHeight: '.2em' }}>
              <h3
                onClick={() => {
                  props.history.push('/cities/' + item.id);
                }}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                {' '}
                {item.name}, {item.region}{' '}
              </h3>
              <p>
                {item.country}, population: {item.population}
              </p>
            </div>
          );
        });
  const specialties =
    data === null
      ? []
      : data.specialties.slice(0, 20).map(item => {
          cnt += 1;
          return (
            <div key={cnt} style={{ paddingBottom: '1em', lineHeight: '1em' }}>
              <h3
                onClick={() => {
                  props.history.push('/specialties/' + item.id);
                }}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                {' '}
                {item.name}{' '}
              </h3>
              <p>
                {item.description.length > 100
                  ? item.description.slice(0, 200) + '...'
                  : item.description}
              </p>
            </div>
          );
        });
  return (
    <div style={{ margin: '3em' }}>
      <h1>You searched for: {queryStr}</h1>
      <CssTextField
        id="outlined-basic"
        label="Search again"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
        onKeyDown={handleKey}
      />
      <h2>Results:</h2>
      <Paper>
        {' '}
        <div style={{ padding: '1em', lineHeight: '1em' }}>
          {doctors.length > 0 ? <h2> Doctors: </h2> : null}
          {doctors}
          {cities.length > 0 ? <h2> Cities: </h2> : null}
          {cities}
          {specialties.length > 0 ? <h2> Specialties: </h2> : null}
          {specialties}
        </div>
      </Paper>
    </div>
  );
}

export default withRouter(Search);
