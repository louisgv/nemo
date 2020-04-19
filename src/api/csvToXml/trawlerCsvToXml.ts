import { createCsvFileReaderStream } from '.'
import * as trawler from '@gftc/trawler'

const withIgnoreError = async fx => {
  try {
    return fx()
  } catch (error) {
    console.error(error)
    return ''
  }
}

const withLenientParser = (file, fx) =>
  withIgnoreError(() => fx(createCsvFileReaderStream(file)))

export const createTransformationEventXml = file =>
  withLenientParser(file, trawler.createTransformationEventXml)

export const createAggregationEventXml = file =>
  withLenientParser(file, trawler.createAggregationEventXml)

export const createObjectEventXml = file =>
  withLenientParser(file, trawler.createObjectEventXml)

export const createEpcClassXml = file =>
  withLenientParser(file, trawler.createEpcClassXml)

export const createLocationXml = file =>
  withLenientParser(file, trawler.createLocationHeaderXml)

export const createBusinessDocumentHeaderXml = file =>
  withLenientParser(file, trawler.createBusinessDocumentHeaderXml)

export const createTrawlerXml = trawler.createTrawlerXml
