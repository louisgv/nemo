import { useState } from 'react'

export function useIpfs(repo) {
  const [ipfs, setIpfs] = useState(null)
  const [isIpfsReady, setIpfsReady] = useState(false)
  const [ipfsError, setIpfsError] = useState('')

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
