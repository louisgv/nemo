import { useState, useEffect } from 'react'
import api from "../api";

const debug = require("debug")("use-ipfs");

const { Ipfs } = window as any

const w = window as any

const ipfs = new Ipfs({
  repo: api.dapp.dappVault.ipfsRepo,
  silent: true
})

ipfs.once('ready', () => {
  w.ipfsReady = true
})

const initIpfs = (ipfs: any) => new Promise((resolve, reject) => {
  if (w.ipfsReady) {
    resolve()
  }

  ipfs.once('ready', () => {
    w.ipfsReady = true
    resolve()
  })

  ipfs.once('error', (err: any) => reject(err))
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

