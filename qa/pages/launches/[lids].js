import { useRouter } from 'next/router'

const Launch = () => {
  const router = useRouter()
  const { lids } = router.query
  console.log(router.query)
  return <p>Launch: {lids}</p>
}

export default Launch