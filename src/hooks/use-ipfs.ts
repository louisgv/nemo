import { useState, useEffect } from 'react'
import api from "../api";

const debug = require("debug")("use-ipfs");

const { Ipfs } = window as any

const ipfs = Ipfs.create({
  repo: api.dapp.dappVault.ipfsRepo,
  silent: true
})

export function useIpfs(opts?: any) {

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

