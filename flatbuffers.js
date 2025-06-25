/*
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var flatbuffers = {
    SIZEOF_SHORT: 2,
    SIZEOF_INT: 4,
    FILE_IDENTIFIER_LENGTH: 4,
    isLittleEndian: (function() {
        var a = new ArrayBuffer(2);
        var b = new Uint8Array(a);
        var c = new Uint16Array(a);
        b[0] = 1;
        b[1] = 2;
        return c[0] === 513;
    })(),
    Long: function(low, high) {
        this.low = low | 0;
        this.high = high | 0;
    },
    createLong: function(low, high) {
        return new flatbuffers.Long(low, high);
    }
};
flatbuffers.Long.prototype.toFloat64 = function() {
    return this.low + this.high * 4294967296;
};
flatbuffers.Long.prototype.equals = function(other) {
    return this.low === other.low && this.high === other.high;
};
flatbuffers.Builder = function(initial_size) {
    if (!initial_size) {
        initial_size = 1024;
    }
    this.bb = flatbuffers.ByteBuffer.allocate(initial_size);
    this.space = initial_size;
    this.minalign = 1;
    this.vtable = null;
    this.vtable_in_use = 0;
    this.isNested = false;
    this.object_start = 0;
    this.vtables = [];
    this.head = 1;
    this.nested = false;
    this.finished = false;
};
flatbuffers.Builder.prototype.clear = function() {
    this.bb.clear();
    this.space = this.bb.capacity();
    this.minalign = 1;
    this.vtable = null;
    this.vtable_in_use = 0;
    this.isNested = false;
    this.object_start = 0;
    this.vtables = [];
    this.head = 1;
    this.nested = false;
    this.finished = false;
};
flatbuffers.Builder.prototype.forceDefaults = function(forceDefaults) {
    this.force_defaults = forceDefaults;
};
flatbuffers.Builder.prototype.dataBuffer = function() {
    return this.bb;
};
flatbuffers.Builder.prototype.asUint8Array = function() {
    return this.bb.bytes().subarray(this.bb.position(), this.bb.limit());
};
flatbuffers.Builder.prototype.prep = function(size, additional_bytes) {
    if (size > this.minalign) {
        this.minalign = size;
    }
    var align_size = (~(this.bb.capacity() - this.space + additional_bytes) + 1) & (size - 1);
    while (this.space < align_size + size + additional_bytes) {
        var old_buf_size = this.bb.capacity();
        this.bb = flatbuffers.Builder.growByteBuffer(this.bb);
        this.space += this.bb.capacity() - old_buf_size;
    }
    this.pad(align_size);
};
flatbuffers.Builder.prototype.pad = function(byte_size) {
    for (var i = 0; i < byte_size; i++) {
        this.bb.writeInt8(--this.space, 0);
    }
};
flatbuffers.Builder.prototype.writeInt8 = function(value) {
    this.bb.writeInt8(this.space -= 1, value);
};
flatbuffers.Builder.prototype.writeInt16 = function(value) {
    this.bb.writeInt16(this.space -= 2, value);
};
flatbuffers.Builder.prototype.writeInt32 = function(value) {
    this.bb.writeInt32(this.space -= 4, value);
};
flatbuffers.Builder.prototype.writeInt64 = function(value) {
    this.bb.writeInt64(this.space -= 8, value);
};
flatbuffers.Builder.prototype.writeFloat32 = function(value) {
    this.bb.writeFloat32(this.space -= 4, value);
};
flatbuffers.Builder.prototype.writeFloat64 = function(value) {
    this.bb.writeFloat64(this.space -= 8, value);
};
flatbuffers.Builder.prototype.addInt8 = function(value) {
    this.prep(1, 0);
    this.writeInt8(value);
};
flatbuffers.Builder.prototype.addInt16 = function(value) {
    this.prep(2, 0);
    this.writeInt16(value);
};
flatbuffers.Builder.prototype.addInt32 = function(value) {
    this.prep(4, 0);
    this.writeInt32(value);
};
flatbuffers.Builder.prototype.addInt64 = function(value) {
    this.prep(8, 0);
    this.writeInt64(value);
};
flatbuffers.Builder.prototype.addFloat32 = function(value) {
    this.prep(4, 0);
    this.writeFloat32(value);
};
flatbuffers.Builder.prototype.addFloat64 = function(value) {
    this.prep(8, 0);
    this.writeFloat64(value);
};
flatbuffers.Builder.prototype.addFieldInt8 = function(voffset, value, d) {
    if (this.force_defaults || value !== d) {
        this.addInt8(value);
        this.slot(voffset);
    }
};
flatbuffers.Builder.prototype.addFieldInt16 = function(voffset, value, d) {
    if (this.force_defaults || value !== d) {
        this.addInt16(value);
        this.slot(voffset);
    }
};
flatbuffers.Builder.prototype.addFieldInt32 = function(voffset, value, d) {
    if (this.force_defaults || value !== d) {
        this.addInt32(value);
        this.slot(voffset);
    }
};
flatbuffers.Builder.prototype.addFieldInt64 = function(voffset, value, d) {
    if (this.force_defaults || !value.equals(d)) {
        this.addInt64(value);
        this.slot(voffset);
    }
};
flatbuffers.Builder.prototype.addFieldFloat32 = function(voffset, value, d) {
    if (this.force_defaults || value !== d) {
        this.addFloat32(value);
        this.slot(voffset);
    }
};
flatbuffers.Builder.prototype.addFieldFloat64 = function(voffset, value, d) {
    if (this.force_defaults || value !== d) {
        this.addFloat64(value);
        this.slot(voffset);
    }
};
flatbuffers.Builder.prototype.addFieldOffset = function(voffset, value, d) {
    if (this.force_defaults || value !== d) {
        this.addOffset(value);
        this.slot(voffset);
    }
};
flatbuffers.Builder.prototype.addFieldStruct = function(voffset, value, d) {
    if (value !== d) {
        this.nested(value, d);
        this.slot(voffset);
    }
};
flatbuffers.Builder.prototype.nested = function(obj, d) {
    if (obj === null) {
        return;
    }
    if (obj === d) {
        return;
    }
    this.prep(obj.bb.bytes().BYTES_PER_ELEMENT, 0);
    this.bb.bytes().set(obj.bb.bytes(), this.space -= obj.bb.bytes().length);
};
flatbuffers.Builder.prototype.slot = function(voffset) {
    this.vtable[voffset] = this.offset();
};
flatbuffers.Builder.prototype.offset = function() {
    return this.bb.capacity() - this.space;
};
flatbuffers.Builder.growByteBuffer = function(bb) {
    var old_buf_size = bb.capacity();
    if (old_buf_size & 4294967295) {
        throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
    }
    var new_buf_size = old_buf_size << 1;
    var nbb = flatbuffers.ByteBuffer.allocate(new_buf_size);
    nbb.setPosition(new_buf_size - old_buf_size);
    nbb.bytes().set(bb.bytes(), new_buf_size - old_buf_size);
    return nbb;
};
flatbuffers.Builder.prototype.addOffset = function(offset) {
    this.prep(flatbuffers.SIZEOF_INT, 0);
    this.writeInt32(this.offset() - offset + flatbuffers.SIZEOF_INT);
};
flatbuffers.Builder.prototype.startObject = function(numfields) {
    if (this.nested) {
        throw new Error("FlatBuffers: object serialization must not be nested.");
    }
    if (this.vtable !== null) {
        throw new Error("FlatBuffers: object serialization must not be nested.");
    }
    if (this.vtable === null) {
        this.vtable = [];
    }

    this.vtable_in_use = numfields;
    for (var i = 0; i < numfields; i++) {
        this.vtable[i] = 0;
    }
    this.isNested = true;
    this.object_start = this.offset();
};
flatbuffers.Builder.prototype.endObject = function() {
    if (this.vtable === null || !this.isNested) {
        throw new Error("FlatBuffers: endObject called without startObject");
    }
    this.addInt32(0);
    var vtableloc = this.offset();
    var i = this.vtable_in_use - 1;
    for (; i >= 0 && this.vtable[i] === 0; i--) {}
    var trimmed_size = i + 1;
    for (; i >= 0; i--) {
        this.addInt16(this.vtable[i] !== 0 ? vtableloc - this.vtable[i] : 0);
    }
    var standard_fields = 2;
    this.addInt16(vtableloc - this.object_start);
    this.addInt16((trimmed_size + standard_fields) * flatbuffers.SIZEOF_SHORT);
    var existing_vtable = 0;
    var outer_loop = this.vtables.length - 1;
    for (; outer_loop >= 0; outer_loop--) {
        var start = this.bb.capacity() - this.vtables[outer_loop];
        var size = this.bb.readInt16(start);
        if (size === this.bb.readInt16(vtableloc)) {
            var k = flatbuffers.SIZEOF_SHORT;
            for (; k < size; k += flatbuffers.SIZEOF_SHORT) {
                if (this.bb.readInt16(start + k) !== this.bb.readInt16(vtableloc + k)) {
                    break;
                }
            }
            if (k === size) {
                existing_vtable = this.vtables[outer_loop];
                break;
            }
        }
    }
    if (existing_vtable) {
        this.space = this.bb.capacity() - vtableloc;
        this.bb.writeInt32(this.space, existing_vtable - vtableloc);
    } else {
        this.vtables.push(this.offset());
        this.bb.writeInt32(this.bb.capacity() - vtableloc, this.offset() - vtableloc);
    }
    this.isNested = false;
    return vtableloc;
};
flatbuffers.Builder.prototype.finish = function(root_table, opt_file_identifier) {
    var extra = opt_file_identifier ? flatbuffers.SIZEOF_INT + flatbuffers.FILE_IDENTIFIER_LENGTH : flatbuffers.SIZEOF_INT;
    this.prep(this.minalign, extra);
    if (opt_file_identifier) {
        var i = opt_file_identifier.length - 1;
        for (; i >= 0; i--) {
            this.writeInt8(opt_file_identifier.charCodeAt(i));
        }
    }
    this.addOffset(root_table);
    this.bb.setPosition(this.space);
    this.finished = true;
};
flatbuffers.Builder.prototype.requiredField = function(table, field) {
    var table_start = this.bb.capacity() - table;
    var vtable_start = table_start - this.bb.readInt32(table_start);
    var ok = this.bb.readInt16(vtable_start + field) !== 0;
    if (!ok) {
        throw new Error("FlatBuffers: field " + field + " must be set");
    }
};
flatbuffers.Builder.prototype.createString = function(s) {
    var len = s.length;
    this.addInt32(len);
    this.prep(1, len);
    for (var i = len - 1; i >= 0; i--) {
        this.writeInt8(s.charCodeAt(i));
    }
    return this.offset();
};
flatbuffers.ByteBuffer = function(bytes) {
    this.bytes_ = bytes;
    this.position_ = 0;
};
flatbuffers.ByteBuffer.allocate = function(byte_size) {
    return new flatbuffers.ByteBuffer(new Uint8Array(byte_size));
};
flatbuffers.ByteBuffer.prototype.clear = function() {
    this.position_ = 0;
};
flatbuffers.ByteBuffer.prototype.bytes = function() {
    return this.bytes_;
};
flatbuffers.ByteBuffer.prototype.position = function() {
    return this.position_;
};
flatbuffers.ByteBuffer.prototype.setPosition = function(position) {
    this.position_ = position;
};
flatbuffers.ByteBuffer.prototype.capacity = function() {
    return this.bytes_.length;
};
flatbuffers.ByteBuffer.prototype.readInt8 = function(offset) {
    return this.readUint8(offset) << 24 >> 24;
};
flatbuffers.ByteBuffer.prototype.readUint8 = function(offset) {
    return this.bytes_[offset];
};
flatbuffers.ByteBuffer.prototype.readInt16 = function(offset) {
    return this.readUint16(offset) << 16 >> 16;
};
flatbuffers.ByteBuffer.prototype.readUint16 = function(offset) {
    return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
};
flatbuffers.ByteBuffer.prototype.readInt32 = function(offset) {
    return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
};
flatbuffers.ByteBuffer.prototype.readUint32 = function(offset) {
    return this.readInt32(offset) >>> 0;
};
flatbuffers.ByteBuffer.prototype.readInt64 = function(offset) {
    return new flatbuffers.Long(this.readInt32(offset), this.readInt32(offset + 4));
};
flatbuffers.ByteBuffer.prototype.readUint64 = function(offset) {
    return new flatbuffers.Long(this.readUint32(offset), this.readUint32(offset + 4));
};
flatbuffers.ByteBuffer.prototype.readFloat32 = function(offset) {
    var i32 = this.readInt32(offset);
    var sign = (i32 >> 31);
    var exp = (i32 >> 23 & 255) - 127;
    var frac = (i32 & 8388607 | 8388608);
    return (sign ? -1 : 1) * frac * Math.pow(2, exp - 23);
};
flatbuffers.ByteBuffer.prototype.readFloat64 = function(offset) {
    var low = this.readUint32(offset);
    var high = this.readUint32(offset + 4);
    var sign = (high >> 31);
    var exp = (high >> 20 & 2047) - 1023;
    var frac = (high & 1048575 | 1048576) * 4294967296 + low;
    return (sign ? -1 : 1) * frac * Math.pow(2, exp - 52);
};
flatbuffers.ByteBuffer.prototype.writeInt8 = function(offset, value) {
    this.bytes_[offset] = value;
};
flatbuffers.ByteBuffer.prototype.writeUint8 = function(offset, value) {
    this.bytes_[offset] = value;
};
flatbuffers.ByteBuffer.prototype.writeInt16 = function(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
};
flatbuffers.ByteBuffer.prototype.writeUint16 = function(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
};
flatbuffers.ByteBuffer.prototype.writeInt32 = function(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
    this.bytes_[offset + 2] = value >> 16;
    this.bytes_[offset + 3] = value >> 24;
};
flatbuffers.ByteBuffer.prototype.writeUint32 = function(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
    this.bytes_[offset + 2] = value >> 16;
    this.bytes_[offset + 3] = value >> 24;
};
flatbuffers.ByteBuffer.prototype.writeInt64 = function(offset, value) {
    this.writeInt32(offset, value.low);
    this.writeInt32(offset + 4, value.high);
};
flatbuffers.ByteBuffer.prototype.writeUint64 = function(offset, value) {
    this.writeUint32(offset, value.low);
    this.writeUint32(offset + 4, value.high);
};
flatbuffers.ByteBuffer.prototype.writeFloat32 = function(offset, value) {
    var f32 = new Float32Array(1);
    f32[0] = value;
    var i32 = new Int32Array(f32.buffer);
    this.writeInt32(offset, i32[0]);
};
flatbuffers.ByteBuffer.prototype.writeFloat64 = function(offset, value) {
    var f64 = new Float64Array(1);
    f64[0] = value;
    var i32 = new Int32Array(f64.buffer);
    this.writeInt32(offset, i32[0]);
    this.writeInt32(offset + 4, i32[1]);
};
flatbuffers.ByteBuffer.prototype.__offset = function(bb_pos, vtable_offset) {
    var vtable = bb_pos - this.readInt32(bb_pos);
    return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
};
flatbuffers.ByteBuffer.prototype.__indirect = function(offset) {
    return offset + this.readInt32(offset);
};
flatbuffers.ByteBuffer.prototype.__vector = function(offset) {
    return offset + this.readInt32(offset) + 4;
};
flatbuffers.ByteBuffer.prototype.__vector_len = function(offset) {
    return this.readInt32(offset + this.readInt32(offset));
};
flatbuffers.ByteBuffer.prototype.__string = function(offset, opt_encoding) {
    offset += this.readInt32(offset);
    var length = this.readInt32(offset);
    var result = "";
    var i = 0;
    offset += 4;
    if (opt_encoding === "utf8") {
        var val;
        var hi;
        while (i < length) {
            val = this.bytes_[offset + i++];
            if (val < 128) {
                result += String.fromCharCode(val);
            } else if (val > 191 && val < 224) {
                hi = this.bytes_[offset + i++];
                result += String.fromCharCode((val & 31) << 6 | hi & 63);
            } else if (val > 223 && val < 240) {
                hi = this.bytes_[offset + i++];
                var hi2 = this.bytes_[offset + i++];
                result += String.fromCharCode((val & 15) << 12 | (hi & 63) << 6 | hi2 & 63);
            }
        }
    } else {
        while (i < length) {
            result += String.fromCharCode(this.bytes_[offset + i++]);
        }
    }
    return result;
};
flatbuffers.ByteBuffer.prototype.__union = function(t, offset) {
    offset += this.readInt32(offset);
    t.bb_pos = offset;
    t.bb = this;
    return t;
};