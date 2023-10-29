import { localStorageStructure } from "@/data/localstorage";
import { JsonRpcProvider, WebSocketProvider } from "ethers";
import { FC, createContext, useContext, useEffect, useState } from "react";

type CoreDataProviderProps = {
  provider: WebSocketProvider | JsonRpcProvider
  children: any
}

type CorePageData = {
  currentBlockNumber: number
}

const defaultValue: CorePageData = {
  currentBlockNumber: 0,
}

const coreContext = createContext(defaultValue)

export const CoreDataProvider: FC<CoreDataProviderProps> = ({ children, provider }) => {

  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(defaultValue.currentBlockNumber)

  async function getCurrentBlockNumber() {
    return await provider.getBlockNumber()
  }

  function setCurrentBlockAndWriteHead(n: number) {
    setCurrentBlockNumber(n)
    writeHead(n)
  }

  function writeHead(n: number) {
    localStorage.setItem(localStorageStructure.currentHead.key, n.toString())
  }

  async function initialData() {
    const blockNumber = await getCurrentBlockNumber()
    setCurrentBlockAndWriteHead(blockNumber)
  }

  async function subscribeBlocks() {
    await provider.on("block", (num: number) => {
      setCurrentBlockAndWriteHead(num)
    })
  }

  

  useEffect(() => {
    initialData()
    subscribeBlocks()
  }, [])

  return (
    <coreContext.Provider value={{
      currentBlockNumber,
    }}>{children}</coreContext.Provider>
  )
}

export const useCoreData = () => useContext(coreContext)