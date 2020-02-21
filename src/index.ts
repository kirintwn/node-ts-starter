import 'source-map-support/register';
import { promises as dns, LookupAddress } from 'dns';

const lookupGoogle = (): Promise<LookupAddress> => dns.lookup('google.com');
export default lookupGoogle;
