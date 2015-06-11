import RoomStore from '../stores/room_store';


class Validations {
    static isRoomNameUnique(name) {
        return RoomStore.getRooms().every(function(storedRoom) {
            if(storedRoom.name !== name) {
                return true;
            } else {
                return false;
            }
        });
    }
}

export default Validations;