package org.example.socialhub.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMessageRequest {
    private String message;
    private long userId;
    private long chatId;
}
