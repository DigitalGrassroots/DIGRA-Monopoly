#include <stdexcept>

template<> void ArPacketUtil::addField<int>(ArBasePacket& p, const int& value) {
  p.byte4ToBuf((ArTypes::Byte4) value);
}

template<> void ArPacketUtil::addField<unsigned int>(ArBasePacket& p, const unsigned int& value) {
  p.uByte4ToBuf((ArTypes::UByte4) value);
}

template<> void ArPacketUtil::addField<short>(ArBasePacket& p, const short& value) {
  p.byte2ToBuf((ArTypes::Byte2) value);
}

template<> void ArPacketUtil::addField<unsigned short>(ArBasePacket& p, const unsigned short& value) {
  p.uByte2ToBuf((ArTypes::UByte2) value);
}

template<> void ArPacketUtil::addField<std::string>(ArBasePacket& p, const std::string& value) {
  p.strToBuf(value.c_str());
}

template<> void ArPacketUtil::addField<float>(ArBasePacket& p, const float& value) {
  p.byte4ToBuf(value * 10e4);
}

template<> void ArPacketUtil::addField<double>(ArBasePacket& p, const double& value) {
  p.byte4ToBuf(value * 10e4);
}

template<> void ArPacketUtil::addField<bool>(ArBasePacket& p, const bool& value) {
  p.uByteToBuf(value ? 1 : 0);
}

template<> void ArPacketUtil::addField<char>(ArBasePacket& p, const char& value) {
  p.byteToBuf((ArTypes::Byte)value);
}

template<> void ArPacketUtil::addField<unsigned char>(ArBasePacket& p, const unsigned char& value) {
  p.uByteToBuf((ArTypes::UByte)value);
}

template<> void ArPacketUtil::addField<ArPose>(ArBasePacket& pkt, const ArPose& pose) {
  pkt.byte4ToBuf((ArTypes::Byte4)pose.getX());
  pkt.byte4ToBuf((ArTypes::Byte4)pose.getY());
  pkt.byte4ToBuf((ArTypes::Byte4)pose.getTh());
}

template<> void ArPacketUtil::addField<ArLineSegment>(ArBasePacket& p, const ArLineSegment& l) {
  p.byte4ToBuf((ArTypes::Byte4)l.getX1());
  p.byte4ToBuf((ArTypes::Byte4)l.getY1());
  p.byte4ToBuf((ArTypes::Byte4)l.getX2());
  p.byte4ToBuf((ArTypes::Byte4)l.getY2());
}

template<> void ArPacketUtil::addField<ArPos2D>(ArBasePacket& pkt, const ArPos2D& pos) {
  pkt.byte4ToBuf((ArTypes::Byte4)pos.getX());
  pkt.byte4ToBuf((ArTypes::Byte4)pos.getY());
}

#define PACKET_OUT_OF_RANGE_ERR "No more data fields of this type in the packet."

template<> int ArPacketUtil::getNextField<int>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::Byte4))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return (int) p.bufToByte4();
}

template<> unsigned int ArPacketUtil::getNextField<unsigned int>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::UByte4))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return (unsigned int) p.bufToUByte4();
}

template<> short ArPacketUtil::getNextField<short>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::Byte2))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return (short) p.bufToByte2();
}

template<> unsigned short ArPacketUtil::getNextField<unsigned short>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::UByte2))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return (unsigned short) p.bufToUByte2();
}

template<> std::string ArPacketUtil::getNextField<std::string>(ArBasePacket& p) throw (std::out_of_range) {
  return p.bufToString();
}

template<> float ArPacketUtil::getNextField<float>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::Byte4))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return (float)p.bufToByte4() / 10e4;
}

template<> double ArPacketUtil::getNextField<double>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::Byte4))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return (double)p.bufToByte4() / 10e4;
}

template<> bool ArPacketUtil::getNextField<bool>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::UByte))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return (p.bufToUByte() != 0);
}

template<> char ArPacketUtil::getNextField<char>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::Byte))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return p.bufToByte();
}

template<> unsigned char ArPacketUtil::getNextField<unsigned char>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(sizeof(ArTypes::UByte))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return p.bufToUByte();
}

template<> ArPose ArPacketUtil::getNextField<ArPose>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(2 * sizeof(ArTypes::Byte4))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return ArPose(p.bufToByte4(), p.bufToByte4(), p.bufferContainsBytes(sizeof(ArTypes::Byte4)) ? p.bufToByte4() : 0);
}

template<> ArLineSegment ArPacketUtil::getNextField<ArLineSegment>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(4 * sizeof(ArTypes::Byte4))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
  return ArLineSegment(p.bufToByte4(), p.bufToByte4(), p.bufToByte4(), p.bufToByte4());
}

template<> ArPos2D ArPacketUtil::getNextField<ArPos2D>(ArBasePacket& p) throw(std::out_of_range) {
  if (!p.bufferContainsBytes(2 * sizeof(ArTypes::Byte4))) throw std::out_of_range(PACKET_OUT_OF_RANGE_ERR);
return ArPos2D(p.bufToByte4(), p.bufToByte4());
}

template<typename VT> std::vector<VT> ArPacketUtil::getNextVectorField(ArBasePacket& p) {
std::vector<VT> vec;
size_t len = p.bufToUByte4();
vec.reserve(len);
for (int i = 0; i < len; ++i) {
vec.push_back(getNextField<VT>(p));
}
return vec;
}

template<typename LT> std::list<LT> ArPacketUtil::getNextListField(ArBasePacket& p) {
std::list<LT> l;
size_t len = p.bufToUByte4();
l.reserve(len);
for (int i = 0; i < len; ++i) {
l.push_back(getNextField<LT>(p));
}
return l;
}

template<typename VT> void ArPacketUtil::getNextField(ArBasePacket& p, std::vector<VT>* vec) {
vec->clear();
size_t len = p.bufToUByte4();
vec->reserve(len);
for (int i = 0; i < len; ++i) {
vec->push_back(getNextField<VT>(p));
}
}

template<typename LT> void ArPacketUtil::getNextField(ArBasePacket& p, std::list<LT>* l) {
l->clear();
size_t len = p.bufToUByte4();
l->reserve(len);
for (int i = 0; i < len; ++i) {
l->push_back(getNextField<LT>(p));
}
}
