import { useState, useEffect } from 'react'

const debug = require("debug")("use-ipfs");

const { Ipfs } = window as any

const initIpfs = (ipfs: any) => new Promise((resolve, reject) => {
  ipfs.once('ready', () => resolve(ipfs))
  ipfs.once('error', (err: any) => reject(err))
})

export function useIpfs(opts?: any) {
  const ipfs = new Ipfs(opts)

  const [isIpfsReady, setIpfsReady] = useState(false)
  const [ipfsInitError, setIpfsInitError] = useState(null as any)


  useEffect(() => {
    startIpfs()
    return function cleanup() {
      if (ipfs && ipfs.stop) {
        debug('Stopping IPFS')
        ipfs.stop()
        setIpfsReady(false)
      }
    }
  }, [])

  async function startIpfs() {
    try {
      await initIpfs(ipfs)
      setIpfsReady(true)
    } catch (error) {
      console.error('IPFS init error:', error)
      setIpfsInitError(error)
      setIpfsReady(false)
    }
  }

  debug(ipfs)

  return { ipfs, isIpfsReady, ipfsInitError }
}

