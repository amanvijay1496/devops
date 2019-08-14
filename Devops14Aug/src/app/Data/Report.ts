import { SeverityCount } from './SeverityCount';
import { TypeCount } from './TypeCount';

export interface Report{
    severityCount : SeverityCount;
    typeCount : TypeCount;
    date : Date;
}