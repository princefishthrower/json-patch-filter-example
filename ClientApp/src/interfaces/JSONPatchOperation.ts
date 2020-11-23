import JSONPatchOperationType from "../enums/JSONPatchOperationType";

/**
 * @description RFC 6902 compliant interface for a JSON Patch Operation. See http://jsonpatch.com/ for details.
 */
export default interface JSONPatchOperation {
    op: JSONPatchOperationType;
    path: string;
    value: string;
}
