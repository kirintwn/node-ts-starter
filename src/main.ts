import 'source-map-support/register';
import { promises as dns, LookupAddress } from 'node:dns';

const lookupGoogle = (): Promise<LookupAddress> => dns.lookup('google.com');

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log('Hello World!');
}

export default lookupGoogle;
