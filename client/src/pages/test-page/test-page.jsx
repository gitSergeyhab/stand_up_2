import {jlData} from '../../test/jl';

const Item  = ({company}) => {
  <li> {company} </li>
}


const getMaxMinRate = (arr) => {
  const rates = arr.map((item) => item.rate);

  const max = Math.max(...rates);
  const min = Math.min(...rates);

  return {max, min, dif: max-min, name: arr[0].name}

}

const firstData = jlData.data.filter((item) => item.progress < 0.8).map((item) => ({
  name: item.company, lname: item.loan_name, rate:  item.interest_rate, ytm: item.ytm, rating: item.rating, progress: item.progress
}));


const groupData = firstData.reduce((acc, item) => {
  if (acc[item.name]) {
    acc[item.name] = [...acc[item.name], item]
  } else {
    acc[item.name] = [item]
  }
  return acc;
}, {})

// const filterGroupData = Object.keys(groupData).reduce((acc, item) => {
//   if (groupData[item].length > 1) {

//     return {...acc, [item]: groupData[item]}
//   } return acc;
// }, {})

const filterGroupData = Object.keys(groupData).reduce((acc, item) => {
  if (groupData[item].length > 1) {

    return [...acc,  groupData[item]]
  } return acc;
}, [])

const rates = filterGroupData.map(getMaxMinRate).sort((a,b) => b.dif - a.dif)

export function TestPage() {


  // console.log(jlData.data.slice(0,4))

  // console.log(groupData)
  // const items = jlData.data.map((item) => <Item key={item.loan_isin} company={item.company}/>  )
  console.log({rates})
  return (
    <>
      <h1>Test 1</h1>
      {/* <ol>{items}</ol> */}
    </>
  );
}
