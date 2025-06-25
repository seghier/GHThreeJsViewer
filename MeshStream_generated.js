//==============================================================================
// FINAL, COMPLETE, MANUALLY-GENERATED FILE - DO NOT MODIFY
//==============================================================================

var MeshStream = MeshStream || {};

// --- GEOMETRY ---
MeshStream.Vector3 = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Vector3.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Vector3.prototype.x = function() { return this.bb.readFloat32(this.bb_pos); };
MeshStream.Vector3.prototype.y = function() { return this.bb.readFloat32(this.bb_pos + 4); };
MeshStream.Vector3.prototype.z = function() { return this.bb.readFloat32(this.bb_pos + 8); };
MeshStream.Vector3.createVector3 = function(builder, x, y, z) { builder.prep(4, 12); builder.writeFloat32(z); builder.writeFloat32(y); builder.writeFloat32(x); return builder.offset(); };

MeshStream.Color3 = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Color3.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Color3.prototype.r = function() { return this.bb.readFloat32(this.bb_pos); };
MeshStream.Color3.prototype.g = function() { return this.bb.readFloat32(this.bb_pos + 4); };
MeshStream.Color3.prototype.b = function() { return this.bb.readFloat32(this.bb_pos + 8); };
MeshStream.Color3.createColor3 = function(builder, r, g, b) { builder.prep(4, 12); builder.writeFloat32(b); builder.writeFloat32(g); builder.writeFloat32(r); return builder.offset(); };

MeshStream.Face = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Face.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Face.prototype.a = function() { return this.bb.readUint32(this.bb_pos); };
MeshStream.Face.prototype.b = function() { return this.bb.readUint32(this.bb_pos + 4); };
MeshStream.Face.prototype.c = function() { return this.bb.readUint32(this.bb_pos + 8); };
MeshStream.Face.createFace = function(builder, a, b, c) { builder.prep(4, 12); builder.writeUint32(c); builder.writeUint32(b); builder.writeUint32(a); return builder.offset(); };

MeshStream.Material = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Material.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Material.getRootAsMaterial = function(bb, obj) { return (obj || new MeshStream.Material).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.Material.prototype.id = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Material.prototype.name = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Material.prototype.color = function(obj) { var offset = this.bb.__offset(this.bb_pos, 8); return offset ? (obj || new MeshStream.Color3).__init(this.bb_pos + offset, this.bb) : null; };
MeshStream.Material.prototype.metallic = function() { var offset = this.bb.__offset(this.bb_pos, 10); return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0; };
MeshStream.Material.prototype.roughness = function() { var offset = this.bb.__offset(this.bb_pos, 12); return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0; };
MeshStream.Material.prototype.opacity = function() { var offset = this.bb.__offset(this.bb_pos, 14); return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0; };
MeshStream.Material.startMaterial = function(builder) { builder.startObject(6); };
MeshStream.Material.addId = function(builder, idOffset) { builder.addFieldOffset(0, idOffset, 0); };
MeshStream.Material.addName = function(builder, nameOffset) { builder.addFieldOffset(1, nameOffset, 0); };
MeshStream.Material.addColor = function(builder, colorOffset) { builder.addFieldStruct(2, colorOffset, 0); };
MeshStream.Material.addMetallic = function(builder, metallic) { builder.addFieldFloat32(3, metallic, 0.0); };
MeshStream.Material.addRoughness = function(builder, roughness) { builder.addFieldFloat32(4, roughness, 0.0); };
MeshStream.Material.addOpacity = function(builder, opacity) { builder.addFieldFloat32(5, opacity, 0.0); };
MeshStream.Material.endMaterial = function(builder) { var offset = builder.endObject(); return offset; };

MeshStream.MeshData = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.MeshData.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.MeshData.getRootAsMeshData = function(bb, obj) { return (obj || new MeshStream.MeshData).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.MeshData.prototype.id = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.MeshData.prototype.name = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.MeshData.prototype.vertices = function(index, obj) { var offset = this.bb.__offset(this.bb_pos, 8); return offset ? (obj || new MeshStream.Vector3).__init(this.bb.__vector(this.bb_pos + offset) + index * 12, this.bb) : null; };
MeshStream.MeshData.prototype.verticesLength = function() { var offset = this.bb.__offset(this.bb_pos, 8); return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0; };
MeshStream.MeshData.prototype.normals = function(index, obj) { var offset = this.bb.__offset(this.bb_pos, 10); return offset ? (obj || new MeshStream.Vector3).__init(this.bb.__vector(this.bb_pos + offset) + index * 12, this.bb) : null; };
MeshStream.MeshData.prototype.normalsLength = function() { var offset = this.bb.__offset(this.bb_pos, 10); return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0; };
MeshStream.MeshData.prototype.faces = function(index, obj) { var offset = this.bb.__offset(this.bb_pos, 12); return offset ? (obj || new MeshStream.Face).__init(this.bb.__vector(this.bb_pos + offset) + index * 12, this.bb) : null; };
MeshStream.MeshData.prototype.facesLength = function() { var offset = this.bb.__offset(this.bb_pos, 12); return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0; };
MeshStream.MeshData.prototype.material = function(obj) { var offset = this.bb.__offset(this.bb_pos, 14); return offset ? (obj || new MeshStream.Material).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null; };
MeshStream.MeshData.prototype.timestamp = function() { var offset = this.bb.__offset(this.bb_pos, 16); return offset ? this.bb.readUint64(this.bb_pos + offset) : this.bb.createLong(0, 0); };
MeshStream.MeshData.prototype.boundsMin = function(obj) { var offset = this.bb.__offset(this.bb_pos, 18); return offset ? (obj || new MeshStream.Vector3).__init(this.bb_pos + offset, this.bb) : null; };
MeshStream.MeshData.prototype.boundsMax = function(obj) { var offset = this.bb.__offset(this.bb_pos, 20); return offset ? (obj || new MeshStream.Vector3).__init(this.bb_pos + offset, this.bb) : null; };
// --- NEW: Accessor for the cast_shadow property ---
MeshStream.MeshData.prototype.castShadow = function() { var offset = this.bb.__offset(this.bb_pos, 22); return offset ? !!this.bb.readInt8(this.bb_pos + offset) : true; };
// --- MODIFIED: Start object with 10 fields instead of 9 ---
MeshStream.MeshData.startMeshData = function(builder) { builder.startObject(10); };
MeshStream.MeshData.addId = function(builder, idOffset) { builder.addFieldOffset(0, idOffset, 0); };
MeshStream.MeshData.addName = function(builder, nameOffset) { builder.addFieldOffset(1, nameOffset, 0); };
MeshStream.MeshData.addVertices = function(builder, verticesOffset) { builder.addFieldOffset(2, verticesOffset, 0); };
MeshStream.MeshData.startVerticesVector = function(builder, numElems) { builder.startVector(12, numElems, 4); };
MeshStream.MeshData.addNormals = function(builder, normalsOffset) { builder.addFieldOffset(3, normalsOffset, 0); };
MeshStream.MeshData.startNormalsVector = function(builder, numElems) { builder.startVector(12, numElems, 4); };
MeshStream.MeshData.addFaces = function(builder, facesOffset) { builder.addFieldOffset(4, facesOffset, 0); };
MeshStream.MeshData.startFacesVector = function(builder, numElems) { builder.startVector(12, numElems, 4); };
MeshStream.MeshData.addMaterial = function(builder, materialOffset) { builder.addFieldOffset(5, materialOffset, 0); };
MeshStream.MeshData.addTimestamp = function(builder, timestamp) { builder.addFieldInt64(6, timestamp, builder.createLong(0, 0)); };
MeshStream.MeshData.addBoundsMin = function(builder, boundsMinOffset) { builder.addFieldStruct(7, boundsMinOffset, 0); };
MeshStream.MeshData.addBoundsMax = function(builder, boundsMaxOffset) { builder.addFieldStruct(8, boundsMaxOffset, 0); };
// --- NEW: Builder method for the cast_shadow property ---
MeshStream.MeshData.addCastShadow = function(builder, castShadow) { builder.addFieldInt8(9, +castShadow, +true); };
MeshStream.MeshData.endMeshData = function(builder) { var offset = builder.endObject(); builder.requiredField(offset, 8); builder.requiredField(offset, 12); return offset; };

// --- UI CONTROLS ---
MeshStream.Slider = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Slider.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Slider.getRootAsSlider = function(bb, obj) { return (obj || new MeshStream.Slider).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.Slider.prototype.id = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Slider.prototype.name = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Slider.prototype.min = function() { var offset = this.bb.__offset(this.bb_pos, 8); return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0; };
MeshStream.Slider.prototype.max = function() { var offset = this.bb.__offset(this.bb_pos, 10); return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0; };
MeshStream.Slider.prototype.step = function() { var offset = this.bb.__offset(this.bb_pos, 12); return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0; };
MeshStream.Slider.prototype.value = function() { var offset = this.bb.__offset(this.bb_pos, 14); return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0; };
MeshStream.Slider.prototype.decimals = function() { var offset = this.bb.__offset(this.bb_pos, 16); return offset ? this.bb.readInt32(this.bb_pos + offset) : 0; };
MeshStream.Slider.startSlider = function(builder) { builder.startObject(7); };
MeshStream.Slider.addId = function(builder, idOffset) { builder.addFieldOffset(0, idOffset, 0); };
MeshStream.Slider.addName = function(builder, nameOffset) { builder.addFieldOffset(1, nameOffset, 0); };
MeshStream.Slider.addMin = function(builder, min) { builder.addFieldFloat32(2, min, 0.0); };
MeshStream.Slider.addMax = function(builder, max) { builder.addFieldFloat32(3, max, 0.0); };
MeshStream.Slider.addStep = function(builder, step) { builder.addFieldFloat32(4, step, 0.0); };
MeshStream.Slider.addValue = function(builder, value) { builder.addFieldFloat32(5, value, 0.0); };
MeshStream.Slider.addDecimals = function(builder, decimals) { builder.addFieldInt32(6, decimals, 0); };
MeshStream.Slider.endSlider = function(builder) { var offset = builder.endObject(); return offset; };

MeshStream.Toggle = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Toggle.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Toggle.getRootAsToggle = function(bb, obj) { return (obj || new MeshStream.Toggle).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.Toggle.prototype.id = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Toggle.prototype.name = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Toggle.prototype.value = function() { var offset = this.bb.__offset(this.bb_pos, 8); return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false; };
MeshStream.Toggle.startToggle = function(builder) { builder.startObject(3); };
MeshStream.Toggle.addId = function(builder, idOffset) { builder.addFieldOffset(0, idOffset, 0); };
MeshStream.Toggle.addName = function(builder, nameOffset) { builder.addFieldOffset(1, nameOffset, 0); };
MeshStream.Toggle.addValue = function(builder, value) { builder.addFieldInt8(2, +value, 0); };
MeshStream.Toggle.endToggle = function(builder) { var offset = builder.endObject(); return offset; };

MeshStream.Button = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Button.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Button.getRootAsButton = function(bb, obj) { return (obj || new MeshStream.Button).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.Button.prototype.id = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Button.prototype.name = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Button.startButton = function(builder) { builder.startObject(2); };
MeshStream.Button.addId = function(builder, idOffset) { builder.addFieldOffset(0, idOffset, 0); };
MeshStream.Button.addName = function(builder, nameOffset) { builder.addFieldOffset(1, nameOffset, 0); };
MeshStream.Button.endButton = function(builder) { var offset = builder.endObject(); return offset; };

MeshStream.ColorSwatch = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.ColorSwatch.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.ColorSwatch.getRootAsColorSwatch = function(bb, obj) { return (obj || new MeshStream.ColorSwatch).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.ColorSwatch.prototype.id = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.ColorSwatch.prototype.name = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.ColorSwatch.prototype.hexColor = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 8); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.ColorSwatch.prototype.alpha = function() { var offset = this.bb.__offset(this.bb_pos, 10); return offset ? this.bb.readUint8(this.bb_pos + offset) : 0; };
MeshStream.ColorSwatch.startColorSwatch = function(builder) { builder.startObject(4); };
MeshStream.ColorSwatch.addId = function(builder, idOffset) { builder.addFieldOffset(0, idOffset, 0); };
MeshStream.ColorSwatch.addName = function(builder, nameOffset) { builder.addFieldOffset(1, nameOffset, 0); };
MeshStream.ColorSwatch.addHexColor = function(builder, hexColorOffset) { builder.addFieldOffset(2, hexColorOffset, 0); };
MeshStream.ColorSwatch.addAlpha = function(builder, alpha) { builder.addFieldInt8(3, alpha, 0); };
MeshStream.ColorSwatch.endColorSwatch = function(builder) { var offset = builder.endObject(); return offset; };

MeshStream.ControlData = { NONE: 0, Slider: 1, Toggle: 2, Button: 3, ColorSwatch: 4 };

MeshStream.Control = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Control.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Control.getRootAsControl = function(bb, obj) { return (obj || new MeshStream.Control).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.Control.prototype.dataType = function() { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.readUint8(this.bb_pos + offset) : MeshStream.ControlData.NONE; };
MeshStream.Control.prototype.data = function(obj) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__union(obj, this.bb_pos + offset) : null; };
MeshStream.Control.startControl = function(builder) { builder.startObject(2); };
MeshStream.Control.addDataType = function(builder, dataType) { builder.addFieldInt8(0, dataType, 0); };
MeshStream.Control.addData = function(builder, dataOffset) { builder.addFieldOffset(1, dataOffset, 0); };
MeshStream.Control.endControl = function(builder) { var offset = builder.endObject(); return offset; };

// --- TOP LEVEL SCENE & MESSAGE ---
MeshStream.Scene = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Scene.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Scene.getRootAsScene = function(bb, obj) { return (obj || new MeshStream.Scene).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.Scene.prototype.meshes = function(index, obj) { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? (obj || new MeshStream.MeshData).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null; };
MeshStream.Scene.prototype.meshesLength = function() { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0; };
MeshStream.Scene.prototype.controls = function(index, obj) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? (obj || new MeshStream.Control).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null; };
MeshStream.Scene.prototype.controlsLength = function() { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0; };
MeshStream.Scene.prototype.timestamp = function() { var offset = this.bb.__offset(this.bb_pos, 8); return offset ? this.bb.readUint64(this.bb_pos + offset) : this.bb.createLong(0, 0); };
MeshStream.Scene.startScene = function(builder) { builder.startObject(3); };
MeshStream.Scene.addMeshes = function(builder, meshesOffset) { builder.addFieldOffset(0, meshesOffset, 0); };
MeshStream.Scene.createMeshesVector = function(builder, data) { builder.startVector(4, data.length, 4); for (var i = data.length - 1; i >= 0; i--) { builder.addOffset(data[i]); } return builder.endVector(); };
MeshStream.Scene.startMeshesVector = function(builder, numElems) { builder.startVector(4, numElems, 4); };
MeshStream.Scene.addControls = function(builder, controlsOffset) { builder.addFieldOffset(1, controlsOffset, 0); };
MeshStream.Scene.createControlsVector = function(builder, data) { builder.startVector(4, data.length, 4); for (var i = data.length - 1; i >= 0; i--) { builder.addOffset(data[i]); } return builder.endVector(); };
MeshStream.Scene.startControlsVector = function(builder, numElems) { builder.startVector(4, numElems, 4); };
MeshStream.Scene.addTimestamp = function(builder, timestamp) { builder.addFieldInt64(2, timestamp, builder.createLong(0, 0)); };
MeshStream.Scene.endScene = function(builder) { var offset = builder.endObject(); return offset; };

MeshStream.MessagePayloadType = { NONE: 0, Scene: 1 };

MeshStream.Message = function() { this.bb = null; this.bb_pos = 0; };
MeshStream.Message.prototype.__init = function(i, bb) { this.bb_pos = i; this.bb = bb; return this; };
MeshStream.Message.getRootAsMessage = function(bb, obj) { return (obj || new MeshStream.Message).__init(bb.readInt32(bb.position()) + bb.position(), bb); };
MeshStream.Message.prototype.payloadType = function() { var offset = this.bb.__offset(this.bb_pos, 4); return offset ? this.bb.readUint8(this.bb_pos + offset) : MeshStream.MessagePayloadType.NONE; };
MeshStream.Message.prototype.payload = function(obj) { var offset = this.bb.__offset(this.bb_pos, 6); return offset ? this.bb.__union(obj, this.bb_pos + offset) : null; };
MeshStream.Message.prototype.compression = function(optionalEncoding) { var offset = this.bb.__offset(this.bb_pos, 8); return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null; };
MeshStream.Message.startMessage = function(builder) { builder.startObject(3); };
MeshStream.Message.addPayloadType = function(builder, payloadType) { builder.addFieldInt8(0, payloadType, 0); };
MeshStream.Message.addPayload = function(builder, payloadOffset) { builder.addFieldOffset(1, payloadOffset, 0); };
MeshStream.Message.addCompression = function(builder, compressionOffset) { builder.addFieldOffset(2, compressionOffset, 0); };
MeshStream.Message.endMessage = function(builder) { var offset = builder.endObject(); return offset; };
MeshStream.Message.finishMessageBuffer = function(builder, offset) { builder.finish(offset); };