const hasBuffer = (typeof Buffer !== 'undefined');

export class VSBuffer {

    static alloc(byteLength: number): VSBuffer {
        if (hasBuffer) {
            return new VSBuffer(Buffer.allocUnsafe(byteLength));
        } else {
            return new VSBuffer(new Uint8Array(byteLength));
        }
    }

    static wrap(actual: Uint8Array): VSBuffer {
        if (hasBuffer && !(Buffer.isBuffer(actual))) {
            // https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
            // Create a zero-copy Buffer wrapper around the ArrayBuffer pointed to by the Uint8Array
            actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
        }
        return new VSBuffer(actual);
    }

    readonly buffer: Uint8Array;
    readonly byteLength: number;

    private constructor(buffer: Uint8Array) {
        this.buffer = buffer;
        this.byteLength = this.buffer.byteLength;
    }

    slice(start?: number, end?: number): VSBuffer {
        // IMPORTANT: use subarray instead of slice because TypedArray#slice
        // creates shallow copy and NodeBuffer#slice doesn't. The use of subarray
        // ensures the same, performant, behaviour.
        return new VSBuffer(this.buffer.subarray(start, end));
    }

}
