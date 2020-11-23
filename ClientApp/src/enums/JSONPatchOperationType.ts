/**
 * @description RFC 6902 compliant enum for allowed JSON Patch operations. See http://jsonpatch.com/ for details.
 */
enum JSONPatchOperationType {
    Add = "add",
    Remove = "remove",
    Replace = "replace",
    Copy = "copy",
    Move = "move",
    Test = "test"
}

export default JSONPatchOperationType;
