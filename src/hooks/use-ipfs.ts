import { useState, useEffect } from 'react'

export function useIpfs(repo) {
  const [ipfs, setIpfs] = useState(null)
  const [isIpfsReady, setIpfsReady] = useState(false)
  const [ipfsError, setIpfsError] = useState('')

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.
    return function cleanup () {
      if (ipfs && ipfs.stop) {
        console.log('Stopping IPFS')
        ipfs.stop().catch(err => console.error(err))
        setIpfs(null);
        setIpfsReady(false)
      }
    }
  })


  async function getIpfs() {
    if (!window.Ipfs) {
      return null
    }

    if (isIpfsReady) {
      return ipfs
    }

    const { Ipfs } = window

    try {
      const ipfsInstance = await Ipfs.create({
        repo
      })

      setIpfsReady(true)
      setIpfs(ipfsInstance)

      if (!ipfsInstance) {
        throw new Error('IPFS initialize error, please try again.')
      }

      return ipfsInstance
    } catch (error) {
      setIpfsReady(false)
      setIpfsError('IPFS Error')
      console.error(error)
    }
  }

  return { getIpfs, isIpfsReady, ipfsError }
}
